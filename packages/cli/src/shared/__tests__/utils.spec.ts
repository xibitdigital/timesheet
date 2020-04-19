import { objectToQuerystring } from '../utils'

describe('Utils ', () => {
  describe('objectToQuerystring ', () => {
    test('it should ', () => {
      const sample = { a: 'foo', b: 'bar' }
      const expectedResult = 'a=foo&b=bar'

      expect(objectToQuerystring(sample)).toEqual(expectedResult)
    })
  })
})
