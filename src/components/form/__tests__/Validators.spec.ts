import {
  maxLengthValidator,
  minLengthValidator,
  requiredValidator,
} from '../Validators'
import { FieldConfigObject, FieldType, Field } from '../FormTypes'

describe('Validators', () => {
  interface Test {
    name: ''
    surname: ''
  }

  const fields: FieldConfigObject<Test> = {
    name: {
      fieldType: FieldType.TEXT,
      label: 'Name',
      id: 'name',
      value: 'me',
      error: false,
      errorMessage: '',
      disabled: false,
      validators: [requiredValidator],
    },
    surname: {
      fieldType: FieldType.TEXT,
      label: 'Surname',
      id: 'surname',
      value: '',
      error: false,
      errorMessage: '',
      disabled: false,
      validators: [requiredValidator],
    },
  }

  describe('requiredValidator()', () => {
    it('should pass', () => {
      const field: Field<Test> = fields.name
      expect(requiredValidator(field, fields)).toEqual({
        errorMessage: '',
        error: false,
      })
    })

    it('should return error', () => {
      const field: Field<Test> = fields.surname
      expect(requiredValidator(field, fields)).toEqual({
        errorMessage: 'Required',
        error: true,
      })
    })
  })

  describe('minLenghtValidator()', () => {
    it('should pass', () => {
      const validator = minLengthValidator(2)
      const field: Field<Test> = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: '',
        error: false,
      })
    })

    it('should return error', () => {
      const validator = minLengthValidator(20)
      const field: Field<Test> = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: 'Too short',
        error: true,
      })
    })
  })

  describe('minLenghtValidator()', () => {
    it('should pass', () => {
      const validator = maxLengthValidator(4)
      const field: Field<Test> = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: '',
        error: false,
      })
    })

    it('should return error', () => {
      const validator = maxLengthValidator(1)
      const field: Field<Test> = fields.name
      expect(validator(field, fields)).toEqual({
        errorMessage: 'Too long',
        error: true,
      })
    })
  })
})
