import axios from 'axios';

const baseURL = 'https://www.iyd.wang';

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'text/html; charset=UTF-8'
  },
});

export default axiosClient;