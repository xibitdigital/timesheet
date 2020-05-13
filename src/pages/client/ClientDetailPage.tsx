import { Box } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { Client, COLLECTIONS } from '../../shared/collections'
import { FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'

export const ClientDetailPage: React.FC = () => {
  const { id } = useParams()
  const history = useHistory()

  const saveData: SubmitProcess = (newClient: Partial<Client>) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT)
      .doc(id)
      .update(newClient)
      .then((res) => {
        history.push('/client')
        return res
      })
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
      <Box paddingTop={3} paddingBottom={3}>
        <ClientForm saveData={saveData} loadData={loadData} />
      </Box>
      <BackButton to="/client" />
    </Fragment>
  )
}
