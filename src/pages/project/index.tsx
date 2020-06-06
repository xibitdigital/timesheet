import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { MainContainer, FormButtons } from '../../components/Layout'
import { COLLECTIONS, ProjectCollectionItem } from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { Routes } from '../../shared/routes'
import { ProjectList } from './ProjectList'

export const ProjectPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const history = useHistory()

  const [items, loading] = useCollectionData<ProjectCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.PROJECT).where(
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
    history.push(`${Routes.PROJECT}/new`)
  }

  const handleSelect = (id: string) => {
    history.push(`${Routes.PROJECT}/${id}`)
  }

  return (
    <MainContainer>
      <Typography variant="h2">Projects</Typography>
      <FormButtons>
        <Button onClick={handleNew} variant="contained" color="primary">
          New Project
        </Button>
      </FormButtons>
      <ProjectList loading={loading} items={items} onSelect={handleSelect} />
      <BackButton />
    </MainContainer>
  )
}
