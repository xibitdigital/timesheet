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
import { FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'
import { ClientList } from './components/ClientList'

export const ClientPage: React.FC = () => {
  const history = useHistory()
  const [items, loading, error] = useCollectionData<ClientCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const saveData: SubmitProcess = (newClient: Partial<Client>) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newClient)
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
