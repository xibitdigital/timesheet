// import { firebase } from 'firebase/app';
import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { insertWorkDays, deleteWorkedDays } from './database'
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

const updateWorkedDays = async (
  timeSheetId: string,
  timesheet: TimeSheet
): Promise<void> => {
  const { year, month, countryCode, clientId, owner } = timesheet
  const firstDayOfMonth = getFirstDayOfTheMonth(year, month)
  const endDate = getLastDayOfTheMonth(firstDayOfMonth)

  if (
    isValidDate(firstDayOfMonth) &&
    isValidDate(endDate) &&
    isValidCountry(countryCode)
  ) {
    const days = await getDays(firstDayOfMonth, endDate, countryCode)
    console.log(days)
    const workDays = createWorkedDaysRecords(clientId, timeSheetId, owner)(days)

    await deleteWorkedDays(db, timeSheetId)
    await insertWorkDays(db, workDays)
  }
}

exports.createWorkedDaays = functions.firestore
  .document('timesheets/{timeSheetId}')
  .onCreate(async (snapshoot, context) => {
    console.log('Create')

    const { timeSheetId } = context.params
    const timesheet = snapshoot.data()

    await updateWorkedDays(timeSheetId, timesheet as TimeSheet)
  })

exports.updateWorkedDays = functions.firestore
  .document('timesheets/{timeSheetId}')
  .onUpdate(async (change, context) => {
    console.log('Update')

    const { timeSheetId } = context.params
    const timesheet = change.after.data()

    await updateWorkedDays(timeSheetId, timesheet as TimeSheet)
  })
