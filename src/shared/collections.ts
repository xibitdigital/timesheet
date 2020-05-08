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
  id?: string
  name: string
  clientId: string
}
export interface WorkedDay {
  day: string
  time: number
}

export interface TimeSheet {
  id?: string
  clientId: string
  projectId: string
  month: string
  year: string
  workedDays: WorkedDay[]
}
