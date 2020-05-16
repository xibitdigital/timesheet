///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import {
  isValidDate,
  isValidCountry,
  getDateOfNextMonth,
  getFirstDayOfTheMonth,
} from './date'
import { DatesReqQueryType } from './types'

exports.getDates = functions.https.onRequest(async (req, res) => {
  const { query } = req
  const { startDate, countryCode }: DatesReqQueryType = query
  const firstDayOfMonth = getFirstDayOfTheMonth(startDate)
  const endDate = getDateOfNextMonth(firstDayOfMonth)

  if (
    isValidDate(firstDayOfMonth) &&
    isValidDate(endDate) &&
    isValidCountry(countryCode)
  ) {
    // TODO check if firstDayOfMonth is already in the db

    // TODO if not generate dates with getDays and insert them in the db

    res.json([]) // TODO return new dates of old dates in case the exist
  } else {
    res.status(422).send('invalid request')
  }
})
