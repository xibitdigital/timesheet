import moment from 'moment'
import { WorkedDayCollectionItem } from '../../shared/collections'
import { UpdateWorkDayProcess } from './types'
import { CalendarDay } from '../../components/calendar/CalendarDay'
import React from 'react'
import { WorkedDayForm } from './WorkedDayForm'

export interface CalendarItemProps {
  workedDay: WorkedDayCollectionItem
  updateData: UpdateWorkDayProcess
}

export const WorkedDayItem: React.FC<CalendarItemProps> = ({
  workedDay,
  updateData,
}) => {
  const { date, id } = workedDay
  const momentObj = moment(date)
  const row = momentObj.week()
  const col = momentObj.day() + 1

  return (
    <CalendarDay day={col} week={row}>
      <WorkedDayForm id={id} workedDay={workedDay} updateData={updateData} />
    </CalendarDay>
  )
}
