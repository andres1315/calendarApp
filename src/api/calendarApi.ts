import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const {VITE_API_URL} =getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL || 'http://localhost:3010/api'
})


// Todo Config interceptors
calendarApi.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('token')
    if(token){
      config.headers['x-token'] = token
    }
    return config
  }
)


export {
  calendarApi
}