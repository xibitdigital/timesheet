import * as R from 'ramda'

const dateToString = (date: any) => new Date(date).toString()

export const isValidDate = R.compose<any, string, boolean>(
  (str) => str !== 'Invalid Date',
  dateToString
)

export const getDatesFromRange = (startDate: any, endDate: any): Date[] => {
  if (isValidDate(startDate) && isValidDate(endDate)) {
    let dates: Date[] = []
    const theDate = new Date(startDate)
    const theEndDate = new Date(endDate)
    while (theDate < theEndDate) {
      dates = [...dates, new Date(theDate)]
      theDate.setDate(theDate.getDate() + 1)
    }
    return dates
  } else {
    return []
  }
}

export const isWeekend = R.compose<Date, number, boolean>(
  R.or(R.equals(6), R.equals(0)),
  (date: Date) => date.getDay()
)

export const dateToShortISO = (date: Date) => date.toISOString().slice(0, 10)

export const formatPublicHolidays = R.map(R.pick(['date', 'type']))

export const formatDay = R.applySpec({
  day: dateToShortISO,
  type: R.compose<Date, string>((date) =>
    isWeekend(date) ? 'Weekend' : 'Weekday'
  ),
})
