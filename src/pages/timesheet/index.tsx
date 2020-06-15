import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FormButtons, MainContainer } from '../../components/Layout'
import { COLLECTIONS, TimeSheetCollectionItem } from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { Routes } from '../../shared/routes'
import { TimeSheetList } from './TimesheetList'

export const TimesheetPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const history = useHistory()

  const [items, loading] = useCollectionData<TimeSheetCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET)
      .where('owner', '==', user ? user.uid : '')
      .orderBy('name'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const handleSelect = (id: string) => {
    history.push(`${Routes.TIMESHEET}/${id}`)
  }

  const handleNew = () => {
    history.push(`${Routes.TIMESHEET}/new`)
  }

  return (
    <MainContainer>
      <Typography variant="h2">Timesheets</Typography>
      <FormButtons>
        <Button onClick={handleNew} variant="contained" color="primary">
          New Timesheet
        </Button>
      </FormButtons>
      <TimeSheetList loading={loading} items={items} onSelect={handleSelect} />
      <BackButton />
    </MainContainer>
  )
}
