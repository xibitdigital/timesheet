import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  COLLECTIONS,
  TimeSheet,
  TimeSheetCollectionItem,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { TimesheetForm } from './TimesheetForm'
import { TimeSheetList } from './TimesheetList'
import { useHistory } from 'react-router-dom'
import { ModalPanel } from '../../components/ModalPanel'

export const TimesheetPage: React.FC = () => {
  const history = useHistory()
  const [user] = useAuthState(FIREBASE.auth())
  const [modalOpen, setModalOpen] = React.useState(false)
  const [documentId, setDocumentId] = React.useState('')
  const [items, loading] = useCollectionData<TimeSheetCollectionItem>(
    FIRESTORE.collection(COLLECTIONS.TIMESHEET).where(
      'owner',
      '==',
      user ? user.uid : ''
    )
  )

  const saveData: SubmitProcess<TimeSheet> = (data) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<TimeSheetCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.TIMESHEET).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess<TimeSheet> = () => {
    return Promise.reject()
  }

  const saveDocData: SubmitProcess<TimeSheet> = (newClient) => {
    return FIRESTORE.collection(COLLECTIONS.CLIENT)
      .doc(documentId)
      .update(newClient)
      .then((res) => {
        setModalOpen(false)
        return res
      })
  }

  const loadDocData: FetchProcess<TimeSheet> = () => {
    return new Promise((resolve, reject) => {
      FIRESTORE.collection(COLLECTIONS.CLIENT)
        .doc(documentId)
        .get()
        .then(
          (doc) => {
            resolve(doc.data())
          },
          () => reject({})
        )
    })
  }

  const handleSelect = (id: string) => {
    setDocumentId(id)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  return (
    <Fragment>
      <Typography variant="h2">Timesheets</Typography>
      <Box>
        <TimesheetForm saveData={saveData} loadData={loadData} />
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
        body={<TimesheetForm saveData={saveDocData} loadData={loadDocData} />}
      />
      <BackButton />
    </Fragment>
  )
}
