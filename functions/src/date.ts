import * as R from 'ramda'
import { datesCountriesDictionary } from './constants'

const dateToString = (date: any) => new Date(date).toString()

export const isValidDate = R.compose<any, string, boolean>(
  (str) => str !== 'Invalid Date',
  dateToString
)

export const getDatesFromRange = (startDate: any, endDate: any): Date[] => {
  let dates: Date[] = []
  const theDate = new Date(startDate)
  const theEndDate = new Date(endDate)
  while (theDate < theEndDate) {
    dates = [...dates, new Date(theDate)]
    theDate.setDate(theDate.getDate() + 1)
  }
  return dates
}

export const isWeekend = R.compose<Date, number, boolean>(
  R.or(R.equals(6), R.equals(0)),
  (date: Date) => date.getDay()
)

export const dateToShortISO = (date: Date): string =>
  date.toISOString().slice(0, 10)

export const getYearFromShortISO = (ISODate: string): string =>
  ISODate.substr(0, 4)

export const formatPublicHoliday = R.pick(['date', 'type'])

export const formatDay = R.applySpec({
  day: dateToShortISO,
  type: R.compose<Date, string>((date) =>
    isWeekend(date) ? 'Weekend' : 'Weekday'
  ),
})

export const isValidCountry = (countryCode: string) =>
  datesCountriesDictionary[countryCode] ? true : false
