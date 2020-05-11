import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  COLLECTIONS,
  TimeSheet,
  TimeSheetCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { TimesheetForm } from './components/TimesheetForm'
import { TimeSheetList } from './components/TimesheetList'

export const TimesheetPage: React.FC = () => {
  // const history = useHistory()
  const [user] = useAuthState(FIREBASE.auth())
  const [items, loading, error] = useCollectionData<TimeSheetCollectionItem>(
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

  const saveData: SubmitProcess<TimeSheet> = (data) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<TimeSheetCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.TIMESHEET).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return Promise.reject()
  }

  // const handleSelect = (id: string) => {
  //   history.push(`/client/${id}`)
  // }

  return (
    <Fragment>
      <Typography variant="h2">Timesheets</Typography>
      <Box>
        <TimesheetForm saveData={saveData} loadData={loadData} />
      </Box>
      <Box>
        <TimeSheetList loading={loading} items={items} />
      </Box>
      <BackButton />
    </Fragment>
  )
}
