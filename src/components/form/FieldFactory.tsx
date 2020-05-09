import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import {
  Field,
  FieldType,
  FormContext,
  UpdateField,
  FieldValue,
} from './FormTypes'
import { CollectionSelect } from './fields/CollectionSelect'

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

  const { id, label } = config
  const { fields } = context
  const fieldContext = fields[id]

  if (!fieldContext) {
    console.error('Invalid Id', id)
  }

  const { value, valid, errorMessage } = fieldContext

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(id, value)
  }

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const value = event.target.value as any
    debugger
    onChange(id, value as FieldValue)
  }

  const getField = (config: Field) => {
    switch (config.fieldType) {
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
      case FieldType.SELECT:
        const { firestore, collection } = config
        return (
          <CollectionSelect
            id={id}
            name={id}
            value={value}
            label={label}
            firestore={firestore}
            collection={collection}
            onChange={handleSelectChange}
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
        {getField(config)}
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    )
  )
}
