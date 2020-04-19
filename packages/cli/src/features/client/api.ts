import axios from 'axios'

import { objectToQuerystring } from '../../shared/utils'

export const getList = (args: any) =>
  axios.get(`/clients?${objectToQuerystring(args)}`)
