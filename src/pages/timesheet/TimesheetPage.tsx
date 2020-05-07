import Box from '@material-ui/core/Box'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { TimeSheet } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { ClientSelect } from '../client/components/ClientSelect'
import { TimesheetForm } from './components/TimesheetForm'
import { TimeSheetList } from './components/TimesheetList'

export const TimesheetPage: React.FC = () => {
  const [items, loading, error] = useCollectionData<TimeSheet>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const addTimesheet = (newClient: Partial<TimeSheet>) => {
    FIRESTORE.collection(COLLECTIONS.CLIENT).add(newClient)
  }

  return (
    <Box>
      <h1>Client {error ? 'Error' : ''} </h1>
      <div>
        {loading ? 'loading' : 'ok!'} {items?.length}
      </div>
      <Box>
        <TimesheetForm AddTimesheet={addTimesheet} />
      </Box>
      <TimeSheetList loading={loading} items={items} />
      <BackButton />
      <ClientSelect onChange={(id)=> console.log(id)}/>
    </Box>
  )
}
