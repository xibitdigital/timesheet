import api from '../../core/api'

export const getList = (args: any) => api.get(`/clients`)
