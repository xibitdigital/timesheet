import { Box, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useHistory } from 'react-router-dom'
import { BackButton } from '../../components/BackButton'
import { FetchProcess, SubmitProcess } from '../../components/form/FormTypes'
import {
  WorkedDay,
  WorkedDayCollectionItem,
  COLLECTIONS,
} from '../../shared/collections'
import { FIREBASE, FIRESTORE } from '../../shared/firebase.config'
import { getCurrentUserUid } from '../../shared/firebase.utils'
import { WorkedDayForm } from './WorkedDayForm'
import { WorkedDayList } from './WorkedDayList'

interface WorkedDayPageProps {
  timesheetId: string
}

export const WorkedDayPage: React.FC<WorkedDayPageProps> = ({
  timesheetId,
}) => {
  const history = useHistory()
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

  const saveData: SubmitProcess<WorkedDay> = (data) => {
    const owner = getCurrentUserUid()
    if (owner) {
      const newItem: Partial<WorkedDayCollectionItem> = { ...data, owner }
      return FIRESTORE.collection(COLLECTIONS.CLIENT).add(newItem)
    }
    return Promise.reject()
  }

  const loadData: FetchProcess<WorkedDay> = () => {
    return Promise.reject()
  }

  const handleSelect = (id: string) => {
    history.push(`/client/${id}`)
  }

  return (
    <Fragment>
      <Typography variant="h2">WorkedDay</Typography>
      <Box>
        <WorkedDayForm saveData={saveData} loadData={loadData} />
      </Box>
      <Box>
        <WorkedDayList
          loading={loading}
          items={items}
          onSelect={handleSelect}
        />
      </Box>
      <BackButton />
    </Fragment>
  )
}
