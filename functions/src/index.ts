// import { firebase } from 'firebase/app';
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { insertWorkDays } from './database'
import {
  createWorkedDaysRecords,
  getDays,
  getFirstDayOfTheMonth,
  getLastDayOfTheMonth,
  isValidCountry,
  isValidDate,
} from './date'
import { TimeSheet } from './types'
admin.initializeApp()

const db = admin.firestore()

exports.updateWorkedDays = functions.firestore
  .document('timesheets/{timeSheetId}')
  .onUpdate(async (change, context) => {
    console.log('START')
    console.log(context)
    console.log(change.after.data())

    const { timeSheetId } = context.params
    const timesheet = change.after.data()
    const { year, month, countryCode, clientId, owner } = timesheet as TimeSheet // add timesheet type here

    const firstDayOfMonth = getFirstDayOfTheMonth(year, month)
    const endDate = getLastDayOfTheMonth(firstDayOfMonth)

    console.log('RANGE', firstDayOfMonth.toISOString(), endDate.toISOString())

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
        clientId,
        timeSheetId,
        owner
      )(days)
      await insertWorkDays(db, workDays)
    }
  })
