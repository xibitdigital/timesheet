import Button from '@material-ui/core/Button'
import React from 'react'
import {
  FetchProcess,
  FieldFactory,
  SubmitProcess,
  UseForm,
} from '../../components/Form'
import { FormBody, FormButtons, FormContainer } from '../../components/Layout'
import { TimeSheet } from '../../shared/collections'
import { TimesheetFormConfig } from './config'
interface TimesheetFormProps {
  documentId: string
  loadData: FetchProcess<TimeSheet>
  saveData: SubmitProcess<TimeSheet>
}

export const TimesheetForm: React.FC<TimesheetFormProps> = ({
  documentId,
  loadData,
  saveData,
}: TimesheetFormProps): JSX.Element => {
  const { state, submit, reset, updateField, undo } = UseForm<TimeSheet>(
    TimesheetFormConfig,
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
        <FieldFactory id="clientId" fields={fields} onChange={updateField} />
        <FieldFactory id="projectId" fields={fields} onChange={updateField} />
        <FieldFactory id="month" fields={fields} onChange={updateField} />
        <FieldFactory id="year" fields={fields} onChange={updateField} />
        <FieldFactory id="countryCode" fields={fields} onChange={updateField} />
      </FormBody>
      <FormButtons>
        <Button type="reset" onClick={reset}>
          Reset
        </Button>
        <Button type="reset" onClick={undo}>
          Undo
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Submit
        </Button>
      </FormButtons>
    </FormContainer>
  )
}
