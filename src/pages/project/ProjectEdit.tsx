import { Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/Form'
import { Project, COLLECTIONS } from '../../shared/collections'
import { fetchDoc, upsertDoc } from '../../shared/firebase.utils'
import { Routes } from '../../shared/routes'
import { ProjectForm } from './ProjectForm'
import { MainContainer } from '../../components/Layout'

export const ProjectEdit: React.FC = () => {
  const { documentId = '' } = useParams()
  const history = useHistory()

  const saveData: SubmitProcess<Project> = async (data) => {
    const res = await upsertDoc(documentId, COLLECTIONS.PROJECT, data)
    history.push(Routes.PROJECT)
    return res
  }

  const loadData: FetchProcess<Project> = () => {
    return fetchDoc(documentId, COLLECTIONS.PROJECT)
  }

  return (
    <MainContainer>
      <Typography variant="h2">Project Edit</Typography>
      <ProjectForm saveData={saveData} loadData={loadData} />
      <BackButton />
    </MainContainer>
  )
}
