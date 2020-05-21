///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import * as R from 'ramda'

import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getDays,
  createWorkedDaysRecords,
} from './date'
import { DatesReqQueryType, WorkDay } from './types'

const db = firebase.firestore()
const workedDaysRef = db.collection('workeddays')

const insertWorkDays = async (
  db: FirebaseFirestore.Firestore,
  collection: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData
  >,
  days: WorkDay[]
) => {
  const batch = db.batch()

  days.forEach((values) => {
    batch.set(collection.doc(), values)
  })

  return batch.commit()
}

exports.getDates = functions.https.onRequest(async (req, res) => {
  const { query } = req
  const {
    month,
    year,
    countryCode,
    timeSheetId,
    clientId,
  }: DatesReqQueryType = query
  const firstDayOfMonth = new Date(`${year}-${month}-01`)
  const endDate = getDateOfNextMonth(firstDayOfMonth)

  if (
    isValidDate(firstDayOfMonth) &&
    isValidDate(endDate) &&
    isValidCountry(countryCode)
  ) {
    const days = await getDays(firstDayOfMonth.toString(), endDate, countryCode)
    const workDays = createWorkedDaysRecords(clientId, timeSheetId)(days)

    try {
      const results = await insertWorkDays(db, workedDaysRef, workDays)
      res.json(results)
    } catch (err) {
      res.json(false)
    }
  } else {
    res.status(422).send('invalid request')
  }
})
