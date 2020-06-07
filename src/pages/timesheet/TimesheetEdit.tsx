import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/Form/FormTypes'
import { MainContainer } from '../../components/Layout'
import { COLLECTIONS, TimeSheet } from '../../shared/collections'
import { fetchDoc, upsertDoc } from '../../shared/firebase.utils'
import { WorkedDayPage } from '../workedday'
import { TimesheetForm } from './TimesheetForm'

export const TimesheetEdit: React.FC = () => {
  const { documentId = '' } = useParams()
  const history = useHistory()

  const saveData: SubmitProcess<TimeSheet> = async (data) => {
    const res = await upsertDoc(documentId, COLLECTIONS.TIMESHEET, data)
    // history.push(Routes.TIMESHEET)
    return res
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return fetchDoc(documentId, COLLECTIONS.TIMESHEET)
  }

  return (
    <MainContainer>
      <Typography variant="h2">Timesheet Edit</Typography>
      <TimesheetForm
        saveData={saveData}
        loadData={loadData}
        documentId={documentId}
      />
      <WorkedDayPage timesheetId={documentId}></WorkedDayPage>
      <BackButton />
    </MainContainer>
  )
}
