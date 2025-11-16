'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, AuthState } from '@/types/auth'

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  })

  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          setState({
            user: profile || {
              id: session.user.id,
              email: session.user.email!,
              full_name: session.user.user_metadata.full_name || '',
              username: session.user.user_metadata.username || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            isLoading: false,
            error: null,
          })
        } else {
          setState({ user: null, isLoading: false, error: null })
        }
      } catch (error) {
        setState({ user: null, isLoading: false, error: 'Failed to get session' })
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        setState({
          user: profile || {
            id: session.user.id,
            email: session.user.email!,
            full_name: session.user.user_metadata.full_name || '',
            username: session.user.user_metadata.username || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          isLoading: false,
          error: null,
        })
      } else {
        setState({ user: null, isLoading: false, error: null })
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            username: userData.username,
          },
        },
      })

      if (authError) throw authError

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email,
              full_name: userData.full_name,
              username: userData.username,
              bio: userData.bio,
              website: userData.website,
            },
          ])

        if (profileError) throw profileError
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }))
      throw error
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }))
      throw error
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }))
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!state.user) throw new Error('No user logged in')

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', state.user.id)

      if (error) throw error

      // Update local state
      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
      }))
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }))
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}