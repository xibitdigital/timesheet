import { Button } from '@material-ui/core'
import React from 'react'
import { FormBody, FormButtons, FormContainer } from '../../components/Layout'
import { Project } from '../../shared/collections'
import { ProjectFormConfig } from './config'
import {
  FetchProcess,
  SubmitProcess,
  UseForm,
  FieldFactory,
} from '../../components/Form'

interface ProjectFormProps {
  saveData: SubmitProcess<Project>
  loadData: FetchProcess<Project>
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  saveData,
  loadData,
}: ProjectFormProps): JSX.Element => {
  const { state, submit, reset, updateField } = UseForm<Project>(
    ProjectFormConfig,
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
        <FieldFactory id="description" fields={fields} onChange={updateField} />
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
