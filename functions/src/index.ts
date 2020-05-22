import * as admin from 'firebase-admin'
admin.initializeApp()

import * as functions from 'firebase-functions'
import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getDays,
  createWorkedDaysRecords,
} from './date'

import { insertWorkDays } from './database'

exports.getDates = functions.https.onRequest(async (req, res) => {
  const { query } = req
  const { month, year, countryCode, timeSheetId, clientId } = query

  const firstDayOfMonth = new Date(`${year}-${month}-01`)
  const endDate = getDateOfNextMonth(firstDayOfMonth)

  if (
    isValidDate(firstDayOfMonth) &&
    isValidDate(endDate) &&
    isValidCountry(countryCode.toString())
  ) {
    const days = await getDays(
      firstDayOfMonth.toString(),
      endDate,
      countryCode.toString()
    )
    const workDays = createWorkedDaysRecords(
      clientId.toString(),
      timeSheetId.toString()
    )(days)

    try {
      const results = await insertWorkDays(workDays)
      res.json(results)
    } catch (err) {
      res.json(false)
    }
  } else {
    res.status(422).send('invalid request')
  }
})
