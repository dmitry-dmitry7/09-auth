import axios, { AxiosError } from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});

export type ApiError = AxiosError<{ error: string }>;
