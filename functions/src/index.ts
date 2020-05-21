///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getDays,
  createWorkedDaysRecords,
} from './date'
import { DatesReqQueryType } from './types'
import { insertWorkDays } from './database'

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
      const results = await insertWorkDays(workDays)
      res.json(results)
    } catch (err) {
      res.json(false)
    }
  } else {
    res.status(422).send('invalid request')
  }
})
