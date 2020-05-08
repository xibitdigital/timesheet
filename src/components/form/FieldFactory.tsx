import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import withStyles from '@material-ui/styles/withStyles'
import React from 'react'
import { Field, FieldType, FormContext, UpdateField } from './FormTypes'
import FormHelperText from '@material-ui/core/FormHelperText'

const StyledFormControl = withStyles({
  root: {
    margin: 1,
    minWidth: 120,
  },
})(FormControl)

export interface FieldFactoryProps {
  config: Field
  context: FormContext
  onChange: UpdateField
}

export const FieldFactory: React.FC<FieldFactoryProps> = (props) => {
  const { context, onChange, config } = props

  if (!context) {
    return null
  }

  const { id, label, defaultValue, type } = config
  const fieldContext = context.fields[id]

  if (!fieldContext) {
    console.error('Invalid Id', id)
  }

  const { value, valid, errorMessage } = fieldContext

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(id, value)
  }

  const getField = (type: FieldType) => {
    switch (type) {
      case FieldType.CHECKBOX: // refactor this one
        return (
          <Input
            id={id}
            name={id}
            aria-describedby={label}
            defaultValue={defaultValue}
            onChange={handleChange}
            value={value}
          />
        )
      case FieldType.TEXT:
        return (
          <Input
            id={id}
            name={id}
            value={value}
            aria-describedby={label}
            onChange={handleChange}
          />
        )
      default:
        return null
    }
  }

  return (
    context && (
      <StyledFormControl error={!valid}>
        <InputLabel htmlFor={id}>
          {label}
        </InputLabel>
        {getField(type)}
        <FormHelperText>{errorMessage}</FormHelperText>
      </StyledFormControl>
    )
  )
}
