export interface Item {
  id: string
  name: string
  surname: string
}

export interface Client {
  id: string
  name: string
  fullAddress: string
  postcode: string
}

export interface Project {
  id: string
  name: string
  clientId: string
}
export interface WorkedDay {
  id: string
  day: string
  time: number
  timesheetId: string
}

export interface TimeSheet {
  id: string
  clientId: string
  projectId: string
  month: string
  year: string
}

export enum COLLECTIONS {
  ITEMS = 'items',
  CLIENT = 'clients',
  PROJECT = 'projects',
  TIMESHEET = 'timesheets',
}
