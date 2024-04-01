import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5002/api/v1',
  baseURL: 'https://eastside-estate.onrender.com/api/v1',
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosInstance
