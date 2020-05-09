import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { Field, FieldType, FormContext, UpdateField } from './FormTypes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

export interface FieldFactoryProps {
  config: Field
  context: FormContext
  onChange: UpdateField
}

export const FieldFactory: React.FC<FieldFactoryProps> = (props) => {
  const { context, onChange, config } = props
  const classes = useStyles()

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
      <FormControl error={!valid} className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {getField(type)}
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    )
  )
}
