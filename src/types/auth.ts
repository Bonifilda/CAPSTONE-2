export interface User {
  id: string
  email: string
  full_name: string
  username: string
  avatar_url?: string
  bio?: string
  website?: string
  created_at: string
  updated_at: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  full_name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface ProfileFormData {
  full_name: string
  username: string
  bio?: string
  website?: string
  avatar_url?: string
}