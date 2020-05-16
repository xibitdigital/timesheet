///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import * as R from 'ramda'
import Axios from 'axios'
import {
  isValidDate,
  getDatesFromRange,
  getYearFromShortISO,
  formatPublicHoliday,
} from './date'
import { HolidayDayType, DatesReqQueryType, DayType } from './types'
import { AxiosResponse } from 'axios'

const datesAPIPrefix = `https://date.nager.at/api/v2`

const holidaysAPI = (year: string, countryCode: string): string =>
  `${datesAPIPrefix}/PublicHolidays/${year}/${countryCode}`

// const availableCountriesAPI = (): string =>
//   `${datesAPIPrefix}/AvailableCountries`

const getPublicHolidays = (year: string, countryCode: string) =>
  Axios.get(holidaysAPI(year, countryCode)).then(
    (response: AxiosResponse) => response.data
  )

const formatPublicHolidays = R.compose<
  HolidayDayType[][],
  HolidayDayType[],
  DayType[]
>(R.map(formatPublicHoliday), R.flatten)

exports.getDates = functions.https.onRequest(async (req, res) => {
  const { startDate, endDate, countryCode }: DatesReqQueryType = req.query

  if (isValidDate(startDate) && isValidDate(endDate)) {
    const days = getDatesFromRange(startDate, endDate)
    const years = [startDate, endDate].map(getYearFromShortISO)

    const publicDays = await Promise.all(
      years.map((year) => getPublicHolidays(year, countryCode))
    )

    const formattedPublicHolidays = formatPublicHolidays(publicDays)

    const mergedDays = { ...days, ...formattedPublicHolidays }

    res.json(mergedDays)
  } else {
    res.status(422).send('invalid request')
  }
})
