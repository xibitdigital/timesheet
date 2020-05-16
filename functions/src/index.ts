///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import { isValidDate, isValidCountry } from './date'
import { DatesReqQueryType } from './types'

exports.getDates = functions.https.onRequest(async (req, res) => {
  const { query } = req
  const { startDate, endDate, countryCode }: DatesReqQueryType = query
  // TODO endDate shouldn't be needed it can be calculated as last day of the month

  if (
    isValidDate(startDate) &&
    isValidDate(endDate) &&
    isValidCountry(countryCode)
  ) {
    // TODO check if startDate is already in the db

    // TODO if not generate dates with getDays and insert them in the db

    res.json([]) // TODO return new dates of old dates in case the exist
  } else {
    res.status(422).send('invalid request')
  }
})
