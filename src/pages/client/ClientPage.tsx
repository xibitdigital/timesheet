import { Box, Button, Typography } from '@material-ui/core'
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
import { ClientForm } from './ClientForm'
import { ClientList } from './ClientList'
import { fetchClientDoc, upsertClientDoc } from './ClientUtils'

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
    return upsertClientDoc(documentId, data).then((res) => {
      setModalOpen(false)
      return res
    })
  }

  const loadData: FetchProcess<Client> = () => {
    return fetchClientDoc(documentId)
  }

  const handleNew = () => {
    setDocumentId('')
    setModalOpen(true)
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
        <Button onClick={handleNew}>New Client</Button>
      </Box>
      <Box>
        <ClientList loading={loading} items={items} onSelect={handleSelect} />
      </Box>
      <ModalPanel
        title="Edit Client"
        description="Amend data and press Submit"
        open={modalOpen}
        onClose={handleClose}
        body={<ClientForm saveData={saveData} loadData={loadData} />}
      />
      <BackButton />
    </Fragment>
  )
}
