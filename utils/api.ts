import axios, { AxiosError } from 'axios';
import { config } from '../config/env';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const apiClient = axios.create({
  baseURL: config.apiHost,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.stabilityApiKey}`,
  },
});

export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  try {
    return await requestFn();
  } catch (error) {
    if (retries === 0 || !(error instanceof AxiosError)) {
      throw error;
    }

    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retryRequest(requestFn, retries - 1);
  }
}