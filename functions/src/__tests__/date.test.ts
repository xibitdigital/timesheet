import {
  getDatesFromRange,
  isValidDate,
  isWeekend,
  dateToShortISO,
  formatPublicHoliday,
  formatDay,
  getYearFromShortISO,
  isValidCountry,
  getDays,
  getDateOfNextMonth,
  getFirstDayOfTheMonth,
  createWorkedDaysRecords,
} from '../date'

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
    const actualResults = isValidDate('2020-01-01')
    expect(actualResults).toBeTruthy()
  })

  it('should return false if an invalid date is given', () => {
    const actualResults = isValidDate('seeee')
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
    const expectedResults = [new Date('2020-01-01'), new Date('2020-01-02')]

    const actualResults = getDatesFromRange('2020-01-01', '2020-01-03')
    expect(actualResults).toEqual(expectedResults)
  })

  it('should return an empty array given two invalid date ranges', () => {
    const actualResults = getDatesFromRange('2020-01-01', '2020-01-01')
    expect(actualResults).toEqual([])
  })

  it('should return an empty array  given two invalid dates', () => {
    const actualResults = getDatesFromRange('gerva', 'soni')
    expect(actualResults).toEqual([])
  })
})

describe('isWeekend', () => {
  it('should return false when given a weekday', () => {
    const actualResults = isWeekend(new Date('2020-01-01'))
    expect(actualResults).toBeFalsy()
  })

  it('should return true when given a weekend', () => {
    const actualResults = isWeekend(new Date('2020-01-04'))
    expect(actualResults).toBeTruthy()
  })
})

describe('dateToShortISO', () => {
  it('should return a short version of the ISO format given a date object', () => {
    const actualResults = dateToShortISO(new Date('2020-01-01'))
    expect(actualResults).toEqual('2020-01-01')
  })
})

describe('formatDay', () => {
  it('should return a formatted week day', () => {
    const actualResults = formatDay(new Date('2020-01-01'))
    expect(actualResults).toEqual({ date: '2020-01-01', type: 'Weekday' })
  })

  it('should return a formatted weekend day', () => {
    const actualResults = formatDay(new Date('2020-01-04'))
    expect(actualResults).toEqual({ date: '2020-01-04', type: 'Weekend' })
  })
})

describe('getYearFromShortISO', () => {
  it('should return the year from an ISO string date', () => {
    const actualResults = getYearFromShortISO('2020-01-04')
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
    const actualResults = await getDays('2020-12-24', '2020-12-27', 'GB')
    expect(actualResults).toEqual({
      '2020-12-24': 'Weekday',
      '2020-12-25': 'Public',
      '2020-12-26': 'Weekend',
    })
  })
})

describe('getDateOfNextMonth', () => {
  it('should return next month date', () => {
    const actualResults = getDateOfNextMonth('2012-12-1')
    expect(actualResults).toEqual('2013-01-01')
  })
})

describe('getFirstDayOfTheMonth', () => {
  it('should return next month date', () => {
    const actualResults = getFirstDayOfTheMonth('2012-12-02')
    expect(actualResults).toEqual('2012-12-01')
  })
})

describe('createWorkedDaysRecords', () => {
  it('should return an array of work days record given a work dictionary', () => {
    const actualResults = createWorkedDaysRecords(
      'clientFoo',
      'timeSheetBar'
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
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
      {
        clientId: 'clientFoo',
        date: '2020-12-25',
        dayType: 'Public',
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
      {
        clientId: 'clientFoo',
        date: '2020-12-26',
        dayType: 'Weekend',
        timeSheetId: 'timeSheetBar',
        workedHours: 0,
      },
    ]

    expect(actualResults).toEqual(expectedResults)
  })
})
