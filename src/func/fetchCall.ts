//func/fetchCall.ts
import axios, { AxiosError } from 'axios'

const getAxiosInstance = (baseURL: string | undefined, token: string) => {
  if (!baseURL) {
    throw new Error('Base URL is not defined.')
  }

  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_SERVER

if (!baseURL) {
  throw new Error(
    'NEXT_PUBLIC_BACKENRecordDetailComment_SERVER is not defined in the environment.',
  )
}

export const axiosInstance = getAxiosInstance(
  baseURL,
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXBweWhzcnl1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjg2OTg0NiwiZXhwIjoxNzAzMDg1ODQ2fQ.Rq7sGPQr41ITjHJMO0D8oplAbsTYoWDXxsfDdR4Dj-DleqrRp2bc-wsw8iWnmPVI1Wx6_JLc6jsnEjXbRvWvew',
)

export async function Postfetch(url: string, data?: any, accesstoken?: string) {
  try {
    const response = await axiosInstance.post(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}
export async function Getfetch(url: string, accessToken?: string) {
  try {
    const response = await axiosInstance.get(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export async function Putfetch(url: string, data?: any) {
  try {
    const response = await axiosInstance.put(url, data)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}

export async function Deletefetch(url: string) {
  try {
    const response = await axiosInstance.delete(url)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError
  }
}
export async function GetPOSTfetch(url: string, tags: string[]) {
  try {
    const response = await fetch(url, {
      next: {
        tags: tags,
      },
      credentials: 'include',
      headers: {
        credentials: 'include',
        Authorization: `Bearer ${'API_TOKEN'}`,
        'Content-Type': 'application/json',
      },
    })
    return response.json()
  } catch (error) {
    const axiosError = error as AxiosError
    // Handle errors here
    throw axiosError
  }
}
export const setHeaderToken = async (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
}