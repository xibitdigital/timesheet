import React, { Fragment } from 'react'
import { Box, Typography } from '@material-ui/core'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { Client } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'
import { ClientList } from './components/ClientList'

export const ClientPage: React.FC = () => {
  const [items, loading] = useCollectionData<Client>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const addClient = (newClient: Partial<Client>): void => {
    FIRESTORE.collection(COLLECTIONS.CLIENT).add(newClient)
  }

  return (
    <Fragment>
      <Typography variant="h2">Client</Typography>
      <Box>
        <ClientForm addClient={addClient} />
      </Box>
      <Box>
        <ClientList loading={loading} items={items} />
      </Box>
      <BackButton />
    </Fragment>
  )
}
