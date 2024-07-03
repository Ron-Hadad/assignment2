import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Note the /api part to match your routes
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
