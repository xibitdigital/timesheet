// ID is added by default by Firebase
export interface FirebaseCollectionItem {
  id: string
  name: string
  owner: string // security, this should be added by formHook when saving
}

export interface Item {
  name: string
  surname: string
}

export interface Client {
  name: string
  fullAddress: string
  postcode: string
}
export type ClientCollectionItem = Client & FirebaseCollectionItem

export interface Project {
  name: string
  clientId: string
}
export type ProjectCollectionItem = Project & FirebaseCollectionItem

export interface WorkedDay {
  day: string
  time: number
  timesheetId: string
}
export type WorkedDayCollectionItem = WorkedDay & FirebaseCollectionItem

export interface TimeSheet {
  name: string
  clientId: string
  projectId: string
  month: string
  year: string
}
export type TimeSheetCollectionItem = TimeSheet & FirebaseCollectionItem

export enum COLLECTIONS {
  ITEMS = 'items',
  CLIENT = 'clients',
  PROJECT = 'projects',
  TIMESHEET = 'timesheets',
}
