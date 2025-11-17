import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Temporary hardcoded values - REPLACE WITH YOUR ACTUAL VALUES
  const supabaseUrl = 'https://wdqmyiknnzbowbvwbfqe.supabase.co'
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here'
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and Anon Key are required')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}