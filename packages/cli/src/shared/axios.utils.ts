import {
  IdToken,
} from '@auth0/auth0-spa-js/dist/typings'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


function createHeaders(token: IdToken): AxiosRequestConfig {
  return {
    headers: { 'Authorization': `Bearer ${token.__raw}` }
  }
}

export function JwtGet<T = any, R = AxiosResponse<T>>(url: string, token: IdToken): Promise<R> {
  return axios.get<T, R>(url, createHeaders(token))
} 

export function JwtPost<T = any, R = AxiosResponse<T>>(url: string, data: any, token: IdToken): Promise<R> {
  return axios.post<T, R>(url, data, createHeaders(token))
} 