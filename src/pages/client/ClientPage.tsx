import { Box, Heading } from 'grommet'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { Client } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'
import { ClientList } from './components/ClientList'

export const ClientPage: React.FC = () => {
  const [items, loading, error] = useCollectionData<Client>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const addClient = (newClient: Partial<Client>) => {
    FIRESTORE.collection(COLLECTIONS.CLIENT).add(newClient)
  }

  return (
    <Box direction="column">
      <Heading>Client {error ? 'Error' : ''} </Heading>
      <div>{loading ? 'loading' : 'ok!'}</div>
      <Box direction="column">
        <ClientForm addClient={addClient} />
      </Box>
      <ClientList loading={loading} items={items} />
      <BackButton />
    </Box>
  )
}
