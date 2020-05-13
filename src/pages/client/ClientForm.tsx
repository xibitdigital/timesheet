import { Box, Button } from '@material-ui/core'
import React from 'react'
import { FieldFactory } from '../../components/Form/FieldFactory'
import { UseForm } from '../../components/Form/FormHook'
import { FetchProcess, SubmitProcess } from '../../components/Form/FormTypes'
import { Client } from '../../shared/collections'
import { ClientFormConfig } from './ClientForm.config'

interface ClientFormProps {
  saveData: SubmitProcess<Client>
  loadData: FetchProcess<Client>
}

export const ClientForm: React.FC<ClientFormProps> = ({
  saveData,
  loadData,
}: ClientFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<Client>(
    ClientFormConfig,
    saveData,
    loadData
  )

  const {
    context: { fields },
  } = state

  return (
    <React.Fragment>
      <FieldFactory id="name" fields={fields} onChange={updateField} />
      <FieldFactory id="fullAddress" fields={fields} onChange={updateField} />
      <FieldFactory id="postcode" fields={fields} onChange={updateField} />
      <Box>
        <Button type="submit" color="primary" onClick={submit}>
          Submit
        </Button>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
      </Box>
    </React.Fragment>
  )
}
