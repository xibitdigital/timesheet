import React, { Fragment } from 'react'
import { Box } from '@material-ui/core'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { Client } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { ClientForm } from './components/ClientForm'
import { ClientList } from './components/ClientList'
import { SubmitProcess } from '../../components/form/FormTypes'

export const ClientPage: React.FC = () => {
  const [items, loading, error] = useCollectionData<Client>(
    FIRESTORE.collection(COLLECTIONS.CLIENT),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const addClient: SubmitProcess = (newClient: Partial<Client>) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newClient);
  }

  return (
    <Fragment>
      <h1>Client {error ? 'Error' : ''} </h1>
      <Box>
        {loading ? 'loading' : 'ok!'} {items?.length}
      </Box>
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
