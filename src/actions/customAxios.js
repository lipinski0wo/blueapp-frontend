import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'text/plain',
  },
})

export default axiosInstance
