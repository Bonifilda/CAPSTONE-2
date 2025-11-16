export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email is invalid'
  return null
}

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required'
  if (password.length < 6) return 'Password must be at least 6 characters'
  return null
}

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required'
  if (username.length < 3) return 'Username must be at least 3 characters'
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers, and underscores'
  return null
}

export const validateFullName = (fullName: string): string | null => {
  if (!fullName) return 'Full name is required'
  if (fullName.length < 2) return 'Full name must be at least 2 characters'
  return null
}

export const validateSignup = (data: {
  full_name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}): ValidationResult => {
  const errors: Record<string, string> = {}

  const fullNameError = validateFullName(data.full_name)
  if (fullNameError) errors.full_name = fullNameError

  const usernameError = validateUsername(data.username)
  if (usernameError) errors.username = usernameError

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const validateLogin = (data: {
  email: string
  password: string
}): ValidationResult => {
  const errors: Record<string, string> = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}