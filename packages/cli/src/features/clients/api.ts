import api from '../../core/api'
import { objectToQuerystring } from '../../core/utils'

export const getList = (args: any) =>
  api.get(`/clients?${objectToQuerystring(args)}`)
