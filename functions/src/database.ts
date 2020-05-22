import * as firebase from 'firebase-admin'
firebase.initializeApp()
const db = firebase.firestore()

const workedDaysRef = db.collection('workeddays')

import { WorkDay } from './types'

export const insertWorkDays = async (days: WorkDay[]) => {
  const batch = db.batch()

  days.forEach((values) => {
    batch.set(workedDaysRef.doc(), values)
  })

  return batch.commit()
}
