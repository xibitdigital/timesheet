import * as Moment from 'moment'
import { DateRange, extendMoment } from 'moment-range'
import * as R from 'ramda'
import { datesCountriesDictionary } from './constants'
import { getPublicHolidays } from './externalAPI'
import { DayFlag, DayType, HolidayDayType, WorkDay } from './types'
const moment = extendMoment(Moment)

export const isValidDate = (date: Moment.Moment) => date.isValid()

export const getDatesFromRange = (
  startDate: Moment.Moment,
  endDate: Moment.Moment
): DateRange => moment.range(startDate, endDate)

export const rangeToDates = (range: DateRange) => Array.from(range.by('days'))

export const isWeekend = (date: Moment.Moment) => {
  return [0, 6].includes(date.day())
}

export const dateToShortISO = (date: Moment.Moment): string =>
  date.format('YYYY-MM-DD')

export const getYear = (date: Moment.Moment): string => date.year().toString()

export const formatPublicHoliday = R.pick(['date', 'type'])

export const formatDay = (date: Moment.Moment) => ({
  date: dateToShortISO(date),
  type: isWeekend(date) ? DayFlag.WEEKEND : DayFlag.WEEKDAY,
})

export const isValidCountry = (countryCode: string) =>
  datesCountriesDictionary[countryCode] ? true : false

const formatPublicHolidays = R.compose<
  HolidayDayType[][],
  HolidayDayType[],
  DayType[]
>(R.map(formatPublicHoliday), R.flatten)

export const daysToDictionary = R.compose<DayType[], any, any>(
  R.fromPairs,
  R.map(R.props(['date', 'type']))
)

export const getDays = async (
  startDate: Moment.Moment,
  endDate: Moment.Moment,
  countryCode: string
): Promise<Record<string, string>> => {
  const range = getDatesFromRange(startDate, endDate)
  const days: DayType[] = rangeToDates(range).map((momentObj) =>
    formatDay(momentObj)
  )
  const years = R.uniq([startDate, endDate].map(getYear))
  const publicHolidayDays = await Promise.all(
    years.map((year) => getPublicHolidays(year, countryCode))
  )
  const formattedPublicHolidays = formatPublicHolidays(
    publicHolidayDays
  ).filter(({ date }) => range.contains(moment.utc(date))) // refactor this

  return {
    ...daysToDictionary(days),
    ...daysToDictionary(formattedPublicHolidays),
  }
}

export const getLastDayOfTheMonth = (date: Moment.Moment): Moment.Moment =>
  moment.utc(dateToShortISO(date)).endOf('month')

export const getFirstDayOfTheMonth = (year: string, month: string) =>
  moment(`${year}-${month}-01`)

export const createWorkedDaysRecords = (
  clientId: string,
  timeSheetId: string,
  owner: string
) =>
  R.compose<Record<string, string>, Record<string, WorkDay>, WorkDay[]>(
    R.values,
    R.mapObjIndexed((dayType, date) => ({
      dayType,
      date,
      clientId,
      timeSheetId,
      workedHours: 0,
      owner,
    }))
  )
