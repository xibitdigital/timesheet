import clientReducer from '../reducer'
import { ClientState } from '../types'

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<ClientState>) =>
  clientReducer(initial as ClientState, {} as any)

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
      expect(initialState.updating).toEqual(false)
    })
  })

  describe('fetchList', () => {})

  describe('error', () => {})
})
