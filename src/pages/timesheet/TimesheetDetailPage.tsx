import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  COLLECTIONS,
  TimeSheet,
  TimeSheetCollectionItem,
  WorkedDay,
  WorkedDayCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { TimesheetForm } from './TimesheetForm'
import { WorkedDayPage } from '../WorkedDay/WorkedDayPage'

export const TimesheetDetailPage: React.FC = () => {
  const { id } = useParams()
  const [user] = useAuthState(FIREBASE.auth())

  const saveData: SubmitProcess<TimeSheet> = (data) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<TimeSheetCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.TIMESHEET).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.TIMESHEET)
        .doc(id)
        .get()
        .then(
          (doc) => {
            resolve(doc.data())
          },
          () => reject({})
        )
    })
  }

  return (
    <Fragment>
      <Typography variant="h2">Timesheets</Typography>
      <Box>
        <TimesheetForm saveData={saveData} loadData={loadData} />
      </Box>
      <Box>
        <WorkedDayPage timesheetId={id} />
      </Box>
      <BackButton />
    </Fragment>
  )
}
