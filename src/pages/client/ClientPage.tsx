import { Box, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  Client,
  ClientCollectionItem,
  COLLECTIONS,
} from '../../shared/collections'
import { FIRESTORE, FIREBASE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'
import { ClientList } from './components/ClientList'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getCurrentUserUid } from '../../shared/firebase.utils'

export const ClientPage: React.FC = () => {
  const history = useHistory()
  const [user] = useAuthState(FIREBASE.auth())
  const [items, loading, error] = useCollectionData<ClientCollectionItem>(
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

  const saveData: SubmitProcess = (data: Partial<Client>) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<ClientCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess = () => {
    return Promise.reject()
  }

  const handleSelect = (id: string) => {
    history.push(`/client/${id}`)
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
      <BackButton />
    </Fragment>
  )
}
