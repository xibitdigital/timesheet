import { Box } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { Client } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'

export const ClientDetailPage: React.FC = () => {
  const { id } = useParams()

  const saveData: SubmitProcess = (newClient: Partial<Client>) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT).doc(id).update(newClient)
  }

  const loadData: FetchProcess = () => {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.CLIENT)
        .doc(id)
        .get()
        .then(
          (doc) => {
            resolve(doc.data())
          },
          () => reject({})
        )
    })
  }

  return (
    <Fragment>
      <h1>Client Details {id}</h1>
      <Box>
        <ClientForm saveData={saveData} loadData={loadData} />
      </Box>
      <BackButton />
    </Fragment>
  )
}
