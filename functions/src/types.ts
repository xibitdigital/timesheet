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
  startDate: string
  countryCode: string
}
