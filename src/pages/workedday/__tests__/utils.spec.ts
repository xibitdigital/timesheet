import { DayFlag } from './../../../../functions/src/types'
import { WorkedDayCollectionItem } from './../../../shared/collections'
import { sortWorkedDays } from '../utils'
describe('WorkedDay utils', () => {
  describe('sortWorkedDays()', () => {
    it('should sort by date', () => {
      const days: WorkedDayCollectionItem[] = [
        {
          id: '1',
          clientId: 'client',
          owner: 'me',
          name: 'ok',
          date: '2020-01-01',
          dayType: DayFlag.PUBLIC,
          workedHours: '2',
          timeSheetId: 't1',
        },
        {
          id: '3',
          clientId: 'client',
          owner: 'me',
          name: 'ok',
          date: '2020-01-03',
          dayType: DayFlag.PUBLIC,
          workedHours: '2',
          timeSheetId: 't1',
        },
        {
          id: '2',
          clientId: 'client',
          owner: 'me',
          name: 'ok',
          date: '2020-01-02',
          dayType: DayFlag.PUBLIC,
          workedHours: '2',
          timeSheetId: 't1',
        },
        {
          id: '4',
          clientId: 'client',
          owner: 'me',
          name: 'ok',
          date: '2020-01-04',
          dayType: DayFlag.PUBLIC,
          workedHours: '2',
          timeSheetId: 't1',
        },
      ]

      expect(sortWorkedDays(days).map((day) => day.id)).toEqual([
        '1',
        '2',
        '3',
        '4',
      ])
    })
  })
})
