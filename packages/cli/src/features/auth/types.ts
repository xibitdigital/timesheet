// TYPES
export type Profile = {
  authenticated: boolean
  idToken: number
  profile: any
  expiresAt: string
}

// STATE
export type AuthState = {
  readonly data: Profile
  readonly loading: boolean
  readonly errors?: string
}
