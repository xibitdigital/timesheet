import { WorkedDay } from './../../shared/collections'
export type UpdateWorkDayProcess = (id: string, data: WorkedDay) => Promise<any>
