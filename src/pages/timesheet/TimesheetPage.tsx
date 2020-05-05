import { Box, Heading } from 'grommet';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BackButton } from '../../components/BackButton';
import { TimeSheet } from '../../shared/collections';
import { COLLECTIONS, FIRESTORE } from '../../shared/firebase.config';
import { TimeSheetList } from './components/TimesheetList';

export const TimesheetPage: React.FC = () => {

    const [items, loading, error] = useCollectionData<TimeSheet>(
        FIRESTORE.collection(COLLECTIONS.TIMESHEET),
        {
          idField: 'id',
          snapshotListenOptions: { includeMetadataChanges: true },
        }
      )


      return (
        <Box direction="column">
        <Heading>Client {error ? 'Error' : ''} </Heading>
        <div>
          {loading ? 'loading' : 'ok!'} {items?.length}
        </div>
        <Box direction="column">
          here form
        </Box>
        <TimeSheetList loading={loading} items={items} />
        <BackButton />
      </Box>

      )

}