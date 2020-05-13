import {
  minLengthValidator,
  requiredValidator,
  maxLengthValidator,
} from '../Validators'
import { FieldContextObject } from './../FormTypes'

describe('Validators', () => {
  interface Test {
    name: ''
    surname: ''
  }

  const fields: FieldContextObject<Test> = {
    name: {
      id: 'name',
      value: 'me',
      valid: true,
      errorMessage: '',
      disabled: false,
    },
    surname: {
      id: 'surname',
      value: undefined,
      valid: true,
      errorMessage: '',
      disabled: false,
    },
  }

  describe('requiredValidator()', () => {
    it('should pass', () => {
      const field = fields.name
      expect(requiredValidator(field, fields)).toEqual({
        errorMessage: '',
        valid: true,
      })
    })

    it('should return error', () => {
      const field = fields.surname
      expect(requiredValidator(field, fields)).toEqual({
        errorMessage: 'Required',
        valid: false,
      })
    })
  })

  describe('minLenghtValidator()', () => {
    it('should pass', () => {
      const validator = minLengthValidator(2)
      const field = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: '',
        valid: true,
      })
    })

    it('should return error', () => {
      const validator = minLengthValidator(20)
      const field = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: 'Too short',
        valid: false,
      })
    })
  })

  describe('minLenghtValidator()', () => {
    it('should pass', () => {
      const validator = maxLengthValidator(4)
      const field = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: '',
        valid: true,
      })
    })

    it('should return error', () => {
      const validator = maxLengthValidator(1)
      const field = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: 'Too long',
        valid: false,
      })
    })
  })
})
