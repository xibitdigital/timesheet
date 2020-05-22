import Axios, { AxiosResponse } from 'axios'
import { HolidayDayType } from './types'

const datesAPIPrefix = `https://date.nager.at/api/v2`

const holidaysAPI = (year: string, countryCode: string): string =>
  `${datesAPIPrefix}/PublicHolidays/${year}/${countryCode}`

// const availableCountriesAPI = (): string =>
//   `${datesAPIPrefix}/AvailableCountries`

export const getPublicHolidays = (
  year: string,
  countryCode: string
): Promise<HolidayDayType[]> => {
  const url = holidaysAPI(year, countryCode)
  console.log(url)
  return Axios.get(url).then((response: AxiosResponse) => response.data)
}
