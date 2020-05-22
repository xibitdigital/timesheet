import * as admin from 'firebase-admin'
import { WorkDay } from './types'

export const insertWorkDays = async (
  db: admin.firestore.Firestore,
  days: WorkDay[]
) => {
  const workedDaysRef = db.collection('workeddays')
  const batch = db.batch()

  days.forEach((values) => {
    batch.set(workedDaysRef.doc(), values)
  })

  return batch.commit()
}
