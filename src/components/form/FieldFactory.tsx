import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import withStyles from '@material-ui/styles/withStyles'
import React from 'react'
import { Field, FieldType } from './FormTypes'

const StyledFormControl = withStyles({
  root: {
    margin: 1,
    minWidth: 120,
  },
})(FormControl)

export interface FieldFactoryProps {
  field: Field
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FieldFactory: React.FC<FieldFactoryProps> = (props) => {
  const { field, onChange } = props
  const { id, label, defaultValue } = field // add validationStatus

  let component = null
  switch (field.type) {
    case FieldType.CHECKBOX:
      component = (
        <Input
          id={id}
          name={name}
          aria-describedby={label}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      )
      break
    case FieldType.TEXT:
      component = (
        <Input
          id={id}
          name={name}
          aria-describedby={label}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      )
      break
  }

  return (
    <StyledFormControl>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      {component}
    </StyledFormControl>
  )
}
