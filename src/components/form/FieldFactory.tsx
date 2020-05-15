import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'
import { CollectionSelect } from './components/CollectionSelect'
import {
  Field,
  FieldConfigObject,
  FieldType,
  FieldValue,
  UpdateField,
} from './FormTypes'

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

export interface FieldFactoryProps<T> {
  id: keyof T
  fields: FieldConfigObject<T>
  onChange: UpdateField<T>
}

export function FieldFactory<T>(props: FieldFactoryProps<T>) {
  const { id, onChange, fields } = props
  const classes = useStyles()
  const idSTring = id.toString()

  if (!fields) {
    return null
  }
  const fieldContext = fields[id]

  if (!fieldContext) {
    console.error('Invalid Id', id)
  }

  const { label, value, error, errorMessage } = fieldContext

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange(id, value)
  }

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const value = event.target.value as any
    onChange(id, value as FieldValue)
  }

  const getField = (config: Field<T>) => {
    switch (config.fieldType) {
      case FieldType.TEXT:
        return (
          <Input
            id={idSTring}
            name={idSTring}
            value={value}
            aria-describedby={label}
            onChange={handleChange}
          />
        )
      case FieldType.NUMBER:
        return (
          <Input
            id={idSTring}
            name={idSTring}
            value={value}
            type="number"
            aria-describedby={label}
            onChange={handleChange}
          />
        )
      case FieldType.SELECT:
        const { options } = config
        return (
          <Select
            id={idSTring}
            name={idSTring}
            value={value}
            aria-describedby={label}
            onChange={handleSelectChange}
          >
            {options.map(({ id: optionId, label: optionLabel }) => (
              <MenuItem key={optionId} value={optionId}>
                {optionLabel}
              </MenuItem>
            ))}
          </Select>
        )
      case FieldType.COLLECTION_SELECT:
        const { collection } = config
        return (
          <CollectionSelect
            id={idSTring}
            name={idSTring}
            value={value}
            label={label}
            collection={collection}
            onChange={handleSelectChange}
          />
        )
      case FieldType.CHECKBOX:
        return (
          <Checkbox
            id={idSTring}
            name={idSTring}
            value={value}
            aria-describedby={label}
            onChange={handleSelectChange}
          />
        )
      default:
        return null
    }
  }

  return (
    fields && (
      <FormControl error={error} className={classes.formControl}>
        <InputLabel htmlFor={idSTring}>{label}</InputLabel>
        {getField(fieldContext)}
        <FormHelperText>{errorMessage}</FormHelperText>
      </FormControl>
    )
  )
}
