import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  COLLECTIONS,
  TimeSheet,
  TimeSheetCollectionItem,
} from '../../shared/collections'
import { FIRESTORE } from '../../shared/firebase.config'
import { TimesheetForm } from './components/TimesheetForm'
import { TimeSheetList } from './components/TimesheetList'

export const TimesheetPage: React.FC = () => {
  // const history = useHistory()
  const [items, loading, error] = useCollectionData<TimeSheetCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const saveData: SubmitProcess = (timesheet: Partial<TimeSheet>) => {
    return FIRESTORE.collection(COLLECTIONS.TIMESHEET).add(timesheet)
  }

  const loadData: FetchProcess = () => {
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
