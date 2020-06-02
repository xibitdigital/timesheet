import {
  createWorkedDaysRecords,
  dateToShortISO,
  formatDay,
  formatPublicHoliday,
  getLastDayOfTheMonth,
  getDatesFromRange,
  getDays,
  getFirstDayOfTheMonth,
  getYear,
  isValidCountry,
  isValidDate,
  isWeekend,
  rangeToDates,
} from '../date'
import * as moment from 'moment'

jest.mock('../externalAPI', () => ({
  getPublicHolidays: jest.fn(() =>
    Promise.resolve([
      {
        date: '2020-12-25',
        localName: 'Christmas Day',
        name: 'Christmas Day',
        countryCode: 'GB',
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        type: 'Public',
      },
    ])
  ),
}))

describe('isValidDate', () => {
  it('should return true if a valid date is given', () => {
    const actualResults = isValidDate(moment.utc('2020-01-01'))
    expect(actualResults).toBeTruthy()
  })

  it('should return false if an invalid date is given', () => {
    const actualResults = isValidDate(moment.utc('seeee'))
    expect(actualResults).toBeFalsy()
  })
})

describe('formatPublicHolidays', () => {
  it('should return formatted public holidays', () => {
    const publicHolidaysAPIMock = {
      date: '2020-01-01',
      localName: 'Rebelot',
      name: "New Year's Day",
      countryCode: 'GB',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      type: 'Public',
    }

    const expectedResults = {
      date: '2020-01-01',
      type: 'Public',
    }

    const actualResults = formatPublicHoliday(publicHolidaysAPIMock)
    expect(actualResults).toEqual(expectedResults)
  })
})

describe('getDatesFromRange', () => {
  it('should return an array of dates given two valid date ranges', () => {
    const expectedResults = ['2020-01-01', '2020-01-02', '2020-01-03']

    const actualResults = getDatesFromRange(
      moment.utc('2020-01-01'),
      moment.utc('2020-01-03')
    )
    expect(rangeToDates(actualResults).map((i) => dateToShortISO(i))).toEqual(
      expectedResults
    )
  })

  it('should return an empty array given two invalid date ranges', () => {
    const actualResults = getDatesFromRange(
      moment.utc('2020-01-01'),
      moment.utc('2020-01-01')
    )
    expect(rangeToDates(actualResults).map((i) => dateToShortISO(i))).toEqual([
      '2020-01-01',
    ])
  })

  it('should return an empty array  given two invalid dates', () => {
    const actualResults = getDatesFromRange(
      moment.utc('gerva'),
      moment.utc('soni')
    )
    expect(rangeToDates(actualResults).map((i) => dateToShortISO(i))).toEqual(
      []
    )
  })
})

describe('isWeekend', () => {
  it('should return false when given a weekday', () => {
    const actualResults = isWeekend(moment.utc('2020-01-01'))
    expect(actualResults).toBeFalsy()
  })

  it('should return true when given a weekend', () => {
    const actualResults = isWeekend(moment.utc('2020-01-04'))
    expect(actualResults).toBeTruthy()
  })
})

describe('dateToShortISO', () => {
  it('should return a short version of the ISO format given a date object', () => {
    const actualResults = dateToShortISO(moment.utc('2020-01-01'))
    expect(actualResults).toEqual('2020-01-01')
  })
})

describe('formatDay', () => {
  it('should return a formatted week day', () => {
    const actualResults = formatDay(moment.utc('2020-01-01'))
    expect(actualResults).toEqual({ date: '2020-01-01', type: 'Weekday' })
  })

  it('should return a formatted weekend day', () => {
    const actualResults = formatDay(moment.utc('2020-01-04'))
    expect(actualResults).toEqual({ date: '2020-01-04', type: 'Weekend' })
  })
})

describe('getYear', () => {
  it('should return the year from an ISO string date', () => {
    const actualResults = getYear(moment.utc('2020-01-04'))
    expect(actualResults).toEqual('2020')
  })
})

describe('isValidCountry', () => {
  it('should return valid if a matched county', () => {
    const actualResults = isValidCountry('TN')
    expect(actualResults).toBeTruthy()
  })

  it('should return valid if not a matched county', () => {
    const actualResults = isValidCountry('Bosisio')
    expect(actualResults).toBeFalsy()
  })
})

describe('getDays', () => {
  it('should return a dictionary of days and type', async () => {
    const actualResults = await getDays(
      moment.utc('2020-12-24'),
      moment.utc('2020-12-31'),
      'GB'
    ) //?
    expect(actualResults).toEqual({
      '2020-12-24': 'Weekday',
      '2020-12-25': 'Public',
      '2020-12-26': 'Weekend',
      '2020-12-27': 'Weekend',
      '2020-12-28': 'Weekday',
      '2020-12-29': 'Weekday',
      '2020-12-30': 'Weekday',
      '2020-12-31': 'Weekday',
    })
  })
})

describe('getLastDayOfTheMonth', () => {
  it('should return last date of the month', () => {
    const actualResults = getLastDayOfTheMonth(moment.utc('2012-12-01'))
    expect(dateToShortISO(actualResults)).toEqual('2012-12-31')
  })
})

describe('getFirstDayOfTheMonth', () => {
  it('should return next month date', () => {
    const actualResults = getFirstDayOfTheMonth('2012', '12')
    expect(dateToShortISO(actualResults)).toEqual('2012-12-01')
  })
})

describe('createWorkedDaysRecords', () => {
  it('should return an array of work days record given a work dictionary', () => {
    const actualResults = createWorkedDaysRecords(
      'clientFoo',
      'timeSheetBar',
      'owner'
    )({
      '2020-12-24': 'Weekday',
      '2020-12-25': 'Public',
      '2020-12-26': 'Weekend',
    })
    const expectedResults = [
      {
        clientId: 'clientFoo',
        date: '2020-12-24',
        dayType: 'Weekday',
        owner: 'owner',
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
      {
        clientId: 'clientFoo',
        date: '2020-12-25',
        dayType: 'Public',
        owner: 'owner',
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
      {
        clientId: 'clientFoo',
        date: '2020-12-26',
        dayType: 'Weekend',
        owner: 'owner',
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
    ]

    expect(actualResults).toEqual(expectedResults)
  })
})
