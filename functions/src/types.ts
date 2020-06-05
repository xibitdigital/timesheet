export interface HolidayDayType {
  date: string
  localName: string
  name: string
  countryCode: string
  fixed: boolean
  global: boolean
  counties: string[]
  launchYear?: number
  type: string
}

export interface DayType {
  date: string
  type: string
}

export interface DatesReqQueryType {
  year: string
  month: string
  countryCode: string
  timeSheetId: string
  clientId: string
}

export interface WorkDay {
  dayType: string
  date: string
  clientId: string
  timeSheetId: string
  workedHours: number
  owner: string
}

export interface TimeSheet {
  name: string
  clientId: string
  projectId: string
  month: string
  year: string
  owner: string
  countryCode: string
}

export enum DayFlag {
  PUBLIC = 'Public',
  WEEKEND = 'Weekend',
  WEEKDAY = 'Weekday',
}
