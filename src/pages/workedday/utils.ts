import moment from 'moment'
import { WorkedDayCollectionItem } from './../../shared/collections'

export interface useCalendarGridReturn {
  week: number
  day: number
  holiday: boolean
}

export function calculateGridPos(
  workedDay: WorkedDayCollectionItem
): useCalendarGridReturn {
  const { date, dayType } = workedDay
  const momentObj = moment(date)
  const week = momentObj.week()
  const day = momentObj.day() + 1
  const holiday = dayType !== 'Weekday'

  return { week, day, holiday }
}

export function calculateWorkedHours(
  workedDays: WorkedDayCollectionItem[] | undefined
): number {
  if (!workedDays) {
    return 0
  }
  return workedDays.reduce(
    (acc: number, current: WorkedDayCollectionItem) =>
      acc + parseInt(current.workedHours),
    0
  )
}

export function sortWorkedDays(
  days: WorkedDayCollectionItem[] = []
): WorkedDayCollectionItem[] {
  return days
    .slice()
    .sort((a: WorkedDayCollectionItem, b: WorkedDayCollectionItem) =>
      a.date > b.date ? 1 : -1
    )
}
