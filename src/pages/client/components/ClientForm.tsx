import { Box, Button } from '@material-ui/core'
import React from 'react'
import { FieldFactory } from '../../../components/form/FieldFactory'
import { UseForm } from '../../../components/form/FormHook'
import { FieldType, FormConfig, SubmitProcess } from '../../../components/form/FormTypes'
import { Client } from '../../../shared/collections'
import { requiredValidator } from '../../../components/form/Validators'

const defaultFormValues: Client = {
  id: '',
  name: '',
  fullAddress: '',
  postcode: '',
}

interface ClientFormProps {
  addClient: SubmitProcess;
}

const ClientFormConfig: FormConfig<Client> = {
  id: { // this should be removed
    type: FieldType.TEXT,
    label: '',
    id: 'id',
    validators: [],
  },
  name: {
    type: FieldType.TEXT,
    label: 'Name',
    id: 'name',
    validators: [requiredValidator],
  },
  fullAddress: {
    type: FieldType.TEXT,
    label: 'Address',
    id: 'fullAddress',
    validators: [requiredValidator],
  },
  postcode: {
    type: FieldType.TEXT,
    label: 'Post Code',
    id: 'postcode',
    validators: [requiredValidator],
  },
}


export const ClientForm: React.FC<ClientFormProps> = ({
  addClient,
}: ClientFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<Client>(addClient, defaultFormValues, ClientFormConfig)

  return (
    <React.Fragment>
      <pre>{JSON.stringify(state.context.fields)}</pre>
      <div>
        <FieldFactory
          context={state.context}
          config={ClientFormConfig.name}
          onChange={updateField}
        />
        <FieldFactory
          context={state.context}
          config={ClientFormConfig.fullAddress}
          onChange={updateField}
        />
        <FieldFactory
          context={state.context}
          config={ClientFormConfig.postcode}
          onChange={updateField}
        />
        <Box>
          <Button type="submit" color="primary" onClick={submit}>
            Submit
          </Button>
          <Button type="reset" onClick={reset}>
            Reset
          </Button>
        </Box>
      </div>
    </React.Fragment>
  )
}
