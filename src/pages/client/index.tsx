import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { MainContainer, FormButtons } from '../../components/Layout'
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
    <MainContainer>
      <Typography variant="h2">Clients</Typography>
      <FormButtons>
        <Button onClick={handleNew} variant="contained" color="primary">
          New Client
        </Button>
      </FormButtons>
      <ClientList loading={loading} items={items} onSelect={handleSelect} />
      <BackButton />
    </MainContainer>
  )
}
