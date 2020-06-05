import { Box, Typography } from '@material-ui/core'
import React, { Fragment, useMemo } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { CalendarContainer } from '../../components/calendar/CalendarContainer'
import {
  COLLECTIONS,
  WorkedDay,
  WorkedDayCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { UpdateWorkDayProcess } from './types'
import { updateWorkday } from './WorkedDayUtils'
import { WorkedDayItem } from './WorkedDayItem'
import { calculateWorkedHours } from './utils'

interface WorkedDayPageProps {
  timesheetId: string
}

export const WorkedDayPage: React.FC<WorkedDayPageProps> = ({
  timesheetId,
}) => {
  const [user] = useAuthState(FIREBASE.auth())
  const [items, loading] = useCollectionData<WorkedDayCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.WORKED_DAYS)
      .where('owner', '==', user ? user.uid : '')
      .where('timeSheetId', '==', timesheetId),
    /* .orderBy('date') */
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const workedHours = useMemo(() => calculateWorkedHours(items), [items])

  const updateData: UpdateWorkDayProcess = (
    documentId: string,
    data: WorkedDay
  ) => {
    return updateWorkday(documentId, data)
  }

  return (
    <Fragment>
      <Box>
        <Typography variant="h4" component="h2">
          Total: {workedHours}h
        </Typography>
      </Box>
      <Box>
        <CalendarContainer>
          {!loading &&
            items &&
            items.map((workedDay) => (
              <WorkedDayItem
                key={workedDay.id}
                workedDay={workedDay}
                updateData={updateData}
              />
            ))}
        </CalendarContainer>
      </Box>
    </Fragment>
  )
}
