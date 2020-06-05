import * as admin from 'firebase-admin'
import { WorkDay } from './types'

const WORKED_DAYS = 'workeddays'

export const insertWorkDays = async (
  db: admin.firestore.Firestore,
  days: WorkDay[]
) => {
  const workedDaysRef = db.collection(WORKED_DAYS)
  const batch = db.batch()

  days.forEach((values) => {
    batch.set(workedDaysRef.doc(), values)
  })

  return batch.commit()
}

export const deleteWorkedDays = async (
  db: admin.firestore.Firestore,
  timeSheetId: string
) => {
  const workedDaysRef = db.collection(WORKED_DAYS)
  const query = workedDaysRef.where('timeSheetId', '==', timeSheetId)
  const snapshot = await query.get()

  if (snapshot.size === 0) {
    return 0
  }

  const batch = db.batch()
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })

  return batch.commit()
}
