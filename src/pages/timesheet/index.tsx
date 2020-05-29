import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { COLLECTIONS, TimeSheetCollectionItem } from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { TimeSheetList } from './TimesheetList'
import { Routes } from '../../shared/routes'

export const TimesheetPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const history = useHistory()

  const [items, loading] = useCollectionData<TimeSheetCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET).where(
      'owner',
      '==',
      user ? user.uid : ''
    ),
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
    <Fragment>
      <Typography variant="h2">Timesheets</Typography>
      <Box>
        <Button onClick={handleNew}>New Timesheet</Button>
      </Box>
      <Box>
        <TimeSheetList
          loading={loading}
          items={items}
          onSelect={handleSelect}
        />
      </Box>
      <BackButton />
    </Fragment>
  )
}
