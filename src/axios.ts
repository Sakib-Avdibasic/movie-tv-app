import axios from 'axios';
const apiKey = '7adaeb9096ca6330821e0f3d1e2a3a20';
const instance = axios.create({ baseURL: 'https://api.themoviedb.org/3/' });
export { instance as axios, apiKey };
