import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import { ModalPanel } from '../../components/ModalPanel'
import {
  COLLECTIONS,
  TimeSheet,
  TimeSheetCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { TimesheetForm } from './TimesheetForm'
import { TimeSheetList } from './TimesheetList'
import { fetchTimeSheetDoc, upsertTimeSheetDoc } from './TimesheetUtils'

export const TimesheetPage: React.FC = () => {
  const [user] = useAuthState(FIREBASE.auth())
  const [modalOpen, setModalOpen] = React.useState(false)
  const [documentId, setDocumentId] = React.useState('')
  const [items, loading] = useCollectionData<TimeSheetCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET).where(
      'owner',
      '==',
      user ? user.uid : ''
    ),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const saveData: SubmitProcess<TimeSheet> = async (data) => {
    const res = await upsertTimeSheetDoc(documentId, data)
    setModalOpen(false)
    return res
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return fetchTimeSheetDoc(documentId)
  }

  const handleSelect = (id: string) => {
    setDocumentId(id)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleNew = () => {
    setDocumentId('')
    setModalOpen(true)
  }

  return (
    <Fragment>
      <Typography variant="h2">Timesheets</Typography>
      <Box>
        <Button onClick={handleNew}>New Timesheet {documentId}</Button>
      </Box>
      <Box>
        <TimeSheetList
          loading={loading}
          items={items}
          onSelect={handleSelect}
        />
      </Box>
      <ModalPanel
        title="Edit Timesheet"
        description="Amend data and press Submit"
        open={modalOpen}
        onClose={handleClose}
        body={
          <TimesheetForm
            saveData={saveData}
            loadData={loadData}
            documentId={documentId}
          />
        }
      />
      <BackButton />
    </Fragment>
  )
}
