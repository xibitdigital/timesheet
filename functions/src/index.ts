///https://date.nager.at/api/v2/PublicHolidays/2020/GB

import * as functions from 'firebase-functions'

const datesAPIPrefix = `https://date.nager.at/api/v2`

const holidaysAPI = (year: string, countryCode: string): string =>
  `${datesAPIPrefix}/PublicHolidays/${year}/${countryCode}`

const availableCountriesAPI = (): string =>
  `${datesAPIPrefix}/AvailableCountries`

export const getCountries = functions.https.onRequest((request, response) => {})
