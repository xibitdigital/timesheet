///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'
import * as R from 'ramda'
import Axios from 'axios'
import {
  isValidDate,
  getDatesFromRange,
  getYearFromShortISO,
  formatPublicHoliday,
  isValidCountry,
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
  const { query } = req
  // const { startDate, endDate, countryCode }: DatesReqQueryType = query // -_- what the
  const { startDate, endDate, countryCode } = query

  if (
    isValidDate(startDate as string) &&
    isValidDate(endDate as string) &&
    isValidCountry(countryCode as string)
  ) {
    const days = getDatesFromRange(startDate, endDate)
    const years = [startDate as string, endDate as string].map(
      getYearFromShortISO
    )
    const publicHolidayDays = await Promise.all(
      years.map((year: string) =>
        getPublicHolidays(year, countryCode as string)
      )
    )
    const formattedPublicHolidays = formatPublicHolidays(publicHolidayDays)
    const mergedDays = { ...days, ...formattedPublicHolidays }

    res.json(mergedDays)
  } else {
    res.status(422).send('invalid request')
  }
})
