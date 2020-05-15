import {
  getDatesFromRange,
  isValidDate,
  isWeekend,
  dateToShortISO,
  formatPublicHolidays,
  formatDay,
} from '../date'

// https://github.com/jedfonner/firebase-functions-jest/blob/master/uppercase/functions/test/test.spec.js

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
    const publicHolidaysAPIMock = [
      {
        date: '2020-01-01',
        localName: 'Rebelot',
        name: "New Year's Day",
        countryCode: 'GB',
        fixed: false,
        global: true,
        counties: null,
        launchYear: null,
        type: 'Public',
      },
    ]
    const expectedResults = [
      {
        date: '2020-01-01',
        type: 'Public',
      },
    ]

    const actualResults = formatPublicHolidays(publicHolidaysAPIMock)
    expect(actualResults).toEqual(expectedResults)
  })
})

describe('getDatesFromRange', () => {
  it('should return an array of dates given two valid date ranges', () => {
    const expectedResults = [new Date('2020-01-01'), new Date('2020-01-02')]

    const actualResults = getDatesFromRange('2020-01-01', '2020-01-03')
    expect(actualResults).toEqual(expectedResults)
  })

  it('should return an empty array of dates given two invalid date ranges', () => {
    const actualResults = getDatesFromRange('2020-01-01', '2020-01-01')
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
    expect(actualResults).toEqual({ day: '2020-01-01', type: 'Weekday' })
  })

  it('should return a formatted weekend day', () => {
    const actualResults = formatDay(new Date('2020-01-04'))
    expect(actualResults).toEqual({ day: '2020-01-04', type: 'Weekend' })
  })
})
