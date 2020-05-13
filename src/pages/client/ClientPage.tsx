import { Box, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { ModalPanel } from '../../components/ModalPanel'
import {
  Client,
  ClientCollectionItem,
  COLLECTIONS,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { ClientForm } from './ClientForm'
import { ClientList } from './ClientList'

export const ClientPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const [modalOpen, setModalOpen] = React.useState(false)
  const [documentId, setDocumentId] = React.useState('')
  const [items, loading] = useCollectionData<ClientCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.CLIENT).where(
      'owner',
      '==',
      user ? user.uid : ''
    ),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const saveData: SubmitProcess<Client> = (data) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<ClientCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess<Client> = () => {
    return Promise.reject()
  }

  const saveDocData: SubmitProcess<Client> = (newClient) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT)
      .doc(documentId)
      .update(newClient)
      .then((res) => {
        setModalOpen(false)
        return res
      })
  }

  const loadDocData: FetchProcess<Client> = () => {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.CLIENT)
        .doc(documentId)
        .get()
        .then(
          (doc) => {
            resolve(doc.data())
          },
          () => reject({})
        )
    })
  }

  const handleSelect = (id: string) => {
    setDocumentId(id)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <Fragment>
      <Typography variant="h2">Client</Typography>
      <Box>
        <ClientForm saveData={saveData} loadData={loadData} />
      </Box>
      <Box>
        <ClientList loading={loading} items={items} onSelect={handleSelect} />
      </Box>
      <ModalPanel
        title="Edit Client"
        description="Amend data and press Submit"
        open={modalOpen}
        onClose={handleClose}
        body={<ClientForm saveData={saveDocData} loadData={loadDocData} />}
      />
      <BackButton />
    </Fragment>
  )
}
