import { Box } from '@material-ui/core'
import moment from 'moment'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import {
  COLLECTIONS,
  WorkedDay,
  WorkedDayCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { UpdateWorkDayProcess } from './workedDay.types'
import { WorkedDayForm } from './WorkedDayForm'
import { updateWorkday } from './WorkedDayUtils'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(53, min-content);
  /* gap: 1em; */
`

interface GridAreaProps {
  row: number
  col: number
}

const GridArea = styled.div<GridAreaProps>`
  display: grid;
  grid-area: ${(props) => props.row} / ${(props) => props.col};
  padding: 0.5em;
`

export interface GridElementProps {
  workedDay: WorkedDayCollectionItem
  updateData: UpdateWorkDayProcess
}

export const GridElement: React.FC<GridElementProps> = ({
  workedDay,
  updateData,
}) => {
  const { date, id } = workedDay
  const momentObj = moment(date)
  const row = momentObj.week()
  const col = momentObj.day() + 1

  return (
    <GridArea col={col} row={row}>
      <WorkedDayForm id={id} workedDay={workedDay} updateData={updateData} />
    </GridArea>
  )
}

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

  const updateData: UpdateWorkDayProcess = (
    documentId: string,
    data: WorkedDay
  ) => {
    return updateWorkday(documentId, data)
  }

  return (
    <Fragment>
      <Box>
        <GridContainer>
          {!loading &&
            items &&
            items.map((workedDay) => (
              <GridElement
                key={workedDay.id}
                workedDay={workedDay}
                updateData={updateData}
              />
            ))}
        </GridContainer>
      </Box>
    </Fragment>
  )
}
