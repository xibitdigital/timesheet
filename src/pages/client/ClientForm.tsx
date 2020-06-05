import { Button } from '@material-ui/core'
import React from 'react'
import { FormBody, FormButtons, FormContainer } from '../../components/Layout'
import { Client } from '../../shared/collections'
import { ClientFormConfig } from './form.'
import {
  FetchProcess,
  SubmitProcess,
  UseForm,
  FieldFactory,
} from '../../components/Form'

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
    <FormContainer>
      <FormBody>
        <FieldFactory id="name" fields={fields} onChange={updateField} />
        <FieldFactory id="fullAddress" fields={fields} onChange={updateField} />
        <FieldFactory id="postcode" fields={fields} onChange={updateField} />
      </FormBody>
      <FormButtons>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Submit
        </Button>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
      </FormButtons>
    </FormContainer>
  )
}
