import { Typography } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/Form'
import { Client, COLLECTIONS } from '../../shared/collections'
import { fetchDoc, upsertDoc } from '../../shared/firebase.utils'
import { Routes } from '../../shared/routes'
import { ClientForm } from './ClientForm'
import { MainContainer } from '../../components/Layout'

export const ClientEdit: React.FC = () => {
  const { documentId = '' } = useParams()
  const history = useHistory()

  const saveData: SubmitProcess<Client> = async (data) => {
    const res = await upsertDoc(documentId, COLLECTIONS.CLIENT, data)
    history.push(Routes.CLIENT)
    return res
  }

  const loadData: FetchProcess<Client> = () => {
    return fetchDoc(documentId, COLLECTIONS.CLIENT)
  }

  return (
    <MainContainer>
      <Typography variant="h2">Client Edit</Typography>
      <ClientForm saveData={saveData} loadData={loadData} />
      <BackButton />
    </MainContainer>
  )
}
