import { HolidayDayType } from './types'
import * as https from 'https'

const datesAPIPrefix = `https://date.nager.at/api/v2`

const holidaysAPI = (year: string, countryCode: string): string =>
  `${datesAPIPrefix}/PublicHolidays/${year}/${countryCode}`

export const getPublicHolidays = (
  year: string,
  countryCode: string
): Promise<HolidayDayType[]> => {
  const url = holidaysAPI(year, countryCode)
  console.log(url)
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          const result = JSON.parse(data)
          resolve(result)
        })
      })
      .on('error', (err) => reject(err))
  })
}
