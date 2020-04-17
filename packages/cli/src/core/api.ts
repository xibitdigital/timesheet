import axios from 'axios'

const API_ROOT =
  window.location.protocol === 'https:'
    ? `${window.location.origin}/api/`
    : 'http://localhost:5001/'

const api = axios.create({
  baseURL: API_ROOT,
})

export default api
