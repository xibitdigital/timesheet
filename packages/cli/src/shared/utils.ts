import * as R from 'ramda'

export const objectToQuerystring = R.compose<
  Record<string, string>,
  Array<[string, string]>,
  Array<string>,
  string
>(R.join('&'), R.map(R.join('=')), R.toPairs)
