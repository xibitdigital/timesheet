import clientReducer from '../reducer'
import { ClientsState } from '../types'

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<ClientsState>) =>
  clientReducer(initial as ClientsState, {} as any)

/**
 * STORIES
 */
describe('AuditDetails Stories', () => {
  const initialState = getInitialState()

  describe('initial state', () => {
    it('should match a snapshot', () => {
      expect(initialState).toMatchSnapshot()
      expect(initialState.data.length).toEqual(0)
      expect(initialState.errors).toEqual(undefined)
      expect(initialState.loading).toEqual(false)
      expect(initialState.errors).toEqual(false)
    })
  })

  describe('fetchList', () => {})

  describe('error', () => {})
})
