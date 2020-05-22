import * as firebase from 'firebase-admin'
firebase.initializeApp()

import * as functions from 'firebase-functions'
import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getDays,
  createWorkedDaysRecords,
} from './date'

import { insertWorkDays } from './database'

exports.updateWorkedDays = functions.firestore
  .document('timesheets/{timeSheetId}')
  .onUpdate(async (change, context) => {
    const { timeSheetId } = context.params
    const timesheet = change.after.data()
    const { year, month, countryCode, clientId } = timesheet as any // add timesheet type here

    const firstDayOfMonth = new Date(`${year}-${month}-01`)
    const endDate = getDateOfNextMonth(firstDayOfMonth)

    if (
      isValidDate(firstDayOfMonth) &&
      isValidDate(endDate) &&
      isValidCountry(countryCode)
    ) {
      const days = await getDays(
        firstDayOfMonth.toString(),
        endDate,
        countryCode
      )
      const workDays = createWorkedDaysRecords(
        clientId.toString(),
        timeSheetId.toString()
      )(days)
      await insertWorkDays(workDays)
    }
  })
