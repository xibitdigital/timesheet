import { Box, Button, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { ClientCollectionItem, COLLECTIONS } from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { Routes } from '../../shared/routes'
import { ClientList } from './ClientList'

export const ClientPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const history = useHistory()

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

  const handleNew = () => {
    history.push(`${Routes.CLIENT}/new`)
  }

  const handleSelect = (id: string) => {
    history.push(`${Routes.CLIENT}/${id}`)
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
      <BackButton />
    </Fragment>
  )
}
