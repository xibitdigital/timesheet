// ID is added by default by Firebase
export interface FirebaseCollectionItem {
  id: string
  name: string
  owner: string // security, this should be added by formHook when saving
}

export interface Client {
  name: string
  fullAddress: string
  postcode: string
}
export type ClientCollectionItem = Client & FirebaseCollectionItem

export interface Project {
  name: string
  description: string
}
export type ProjectCollectionItem = Project & FirebaseCollectionItem

export interface WorkedDay {
  clientId: string
  date: string
  dayType: string
  workedHours: string
  timeSheetId: string
}
export type WorkedDayCollectionItem = WorkedDay & FirebaseCollectionItem

export interface TimeSheet {
  name: string
  clientId: string
  projectId: string
  month: string
  year: string
  countryCode: string
}
export type TimeSheetCollectionItem = TimeSheet & FirebaseCollectionItem

export enum COLLECTIONS {
  ITEMS = 'items',
  CLIENT = 'clients',
  PROJECT = 'projects',
  TIMESHEET = 'timesheets',
  WORKED_DAYS = 'workeddays',
}
