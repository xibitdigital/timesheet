import React, { useMemo } from 'react'
import { CalendarDay } from '../../components/calendar/CalendarDay'
import { WorkedDayCollectionItem } from '../../shared/collections'
import { UpdateWorkDayProcess } from './types'
import { calculateGridPos } from './utils'
import { WorkedDayForm } from './WorkedDayForm'

export interface CalendarItemProps {
  workedDay: WorkedDayCollectionItem
  updateData: UpdateWorkDayProcess
}

export const WorkedDayItem: React.FC<CalendarItemProps> = ({
  workedDay,
  updateData,
}) => {
  const { id } = workedDay
  const { week, day, holiday } = useMemo(() => calculateGridPos(workedDay), [
    workedDay,
  ])

  return (
    <CalendarDay day={day} week={week} holiday={holiday}>
      <WorkedDayForm id={id} workedDay={workedDay} updateData={updateData} />
    </CalendarDay>
  )
}
