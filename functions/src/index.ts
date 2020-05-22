// import { firebase } from 'firebase/app';
import * as admin from 'firebase-admin'
admin.initializeApp()

const db = admin.firestore()

import * as functions from 'firebase-functions'
import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getDays,
  createWorkedDaysRecords,
} from './date'

import { insertWorkDays } from './database'
import { TimeSheet } from './types'

exports.updateWorkedDays = functions.firestore
  .document('timesheets/{timeSheetId}')
  .onUpdate(async (change, context) => {
    console.log('START')
    console.log(context)
    console.log(change.after.data())

    const { timeSheetId } = context.params
    const timesheet = change.after.data()
    const { year, month, countryCode, clientId, owner } = timesheet as TimeSheet // add timesheet type here

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
        clientId,
        timeSheetId,
        owner
      )(days)
      await insertWorkDays(db, workDays)
    }
  })
