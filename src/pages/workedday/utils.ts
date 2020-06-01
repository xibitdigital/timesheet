import { WorkedDayCollectionItem } from './../../shared/collections'
import moment from 'moment'

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
