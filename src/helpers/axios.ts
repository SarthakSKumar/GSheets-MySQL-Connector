import axios from 'axios';
import { config } from '@/config';

export const axiosInstance = axios.create({
  baseURL: config.APPSCRIPT_URL,
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
});
