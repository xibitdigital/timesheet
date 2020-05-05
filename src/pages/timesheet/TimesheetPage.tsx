import { Box, Heading } from 'grommet'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { TimeSheet } from '../../shared/collections'
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config'
import { TimesheetForm } from './components/TimesheetForm'
import { TimeSheetList } from './components/TimesheetList'
import { ClientSelect } from '../client/components/ClientSelect'

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
    <Box direction="column">
      <Heading>Client {error ? 'Error' : ''} </Heading>
      <div>
        {loading ? 'loading' : 'ok!'} {items?.length}
      </div>
      <Box direction="column">
        <TimesheetForm AddTimesheet={addTimesheet} />
      </Box>
      <TimeSheetList loading={loading} items={items} />
      <BackButton />
      <ClientSelect onChange={(id)=> console.log(id)}/>
    </Box>
  )
}
