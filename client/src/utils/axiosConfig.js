import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5002/api/v1',
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

// // Response interceptor for decrypting incoming data
// axiosInstance.interceptors.response.use(
//   function (response) {
//     // Decrypt response data
//     if (response.data) {
//       if (response.data.authorization)
//         localStorage.setItem('token', response.data.authorization)
//       response.data = JSON.parse(decrypt(response.data.data))
//     }

//     return response
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )
export default axiosInstance
