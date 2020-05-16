import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {
  COLLECTIONS,
  WorkedDay,
  WorkedDayCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { WorkedDayForm } from './WorkedDayForm'
import { updateWorkday } from './WorkedDayUtils'
import { UpdateWorkDayProcess } from './workedDay.types'

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
      .where('timesheetId', '==', timesheetId),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const updateData: UpdateWorkDayProcess = (
    documentId: string,
    data: WorkedDay
  ) => {
    return updateWorkday(documentId, data)
  }

  return (
    <Fragment>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">Day</TableCell>
                <TableCell scope="col">Time</TableCell>
                <TableCell scope="col">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                items &&
                items.map((workedDay) => (
                  <WorkedDayForm
                    id={workedDay.id}
                    workedDay={workedDay}
                    updateData={updateData}
                    key={workedDay.id}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  )
}
