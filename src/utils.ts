import {axios} from './axios';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    return {isSuccess: true, data: response.data, errMsg: null}
  } catch(err:any) {
    console.error(err);
    return {isSuccess: false, data: null, errMsg: err.message}
  }
}