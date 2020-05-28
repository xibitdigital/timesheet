import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { COLLECTIONS, TimeSheet } from '../../shared/collections'
import { fetchDoc, upsertDoc } from '../../shared/firebase.utils'
import { Routes } from '../../shared/routes'
import { TimesheetForm } from './TimesheetForm'

export const TimesheetEdit: React.FC = () => {
  const { documentId = '' } = useParams()
  const history = useHistory()

  const saveData: SubmitProcess<TimeSheet> = async (data) => {
    const res = await upsertDoc(documentId, COLLECTIONS.TIMESHEET, data)
    history.push(Routes.TIMESHEET)
    return res
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return fetchDoc(documentId, COLLECTIONS.TIMESHEET)
  }

  return (
    <Fragment>
      <Typography variant="h2">Timesheet Edit</Typography>
      <Box>
        <TimesheetForm
          saveData={saveData}
          loadData={loadData}
          documentId={documentId}
        />
      </Box>
      <BackButton />
    </Fragment>
  )
}
