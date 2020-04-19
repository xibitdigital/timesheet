// TYPES
export type Client = {
  name: string
  address: string
  postcode: string
  vat: string
}

// STATE
export type ClientState = {
  readonly data: Client[]
  readonly loading: boolean
  readonly updating: boolean
  readonly errors?: string
}
