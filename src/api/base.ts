import {API_URL, API_URL_DEV} from '@env';
import {StorageHelper} from '@utils/helpers/storage';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Platform} from 'react-native';

// Debug logging to see what API URLs are loaded
console.log('🔍 API_URL loaded:', API_URL);
console.log('🔍 API_URL_DEV loaded:', API_URL_DEV);
console.log('🔍 Platform:', Platform.OS);
console.log('🔍 Development mode:', __DEV__);

// Helper to create a configured Axios client
const createAxiosClient = (baseURL: string): AxiosInstance => {
  console.log('🔍 Creating Axios client with baseURL:', baseURL);

  // Choose the appropriate API URL based on platform and environment
  let finalBaseURL = baseURL;

  if (Platform.OS === 'web' && __DEV__) {
    // Use development URL for web development
    finalBaseURL = API_URL_DEV;
    console.log('🔍 Using development API URL for web:', finalBaseURL);
  } else {
    // Use production URL for mobile or production web
    finalBaseURL = API_URL;
    console.log('🔍 Using production API URL:', finalBaseURL);
  }

  console.log('🔍 Final baseURL:', finalBaseURL);

  const client = axios.create({baseURL: finalBaseURL});

  client.interceptors.request.use(async config => {
    const accessToken = await StorageHelper.get<string>('accessToken');

    console.log('accessToken', accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, Promise.reject);

  client.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshedToken = await refreshToken();

          if (refreshedToken) {
            originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

            return await client(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};

// Refresh token logic
const refreshToken = async () => {
  try {
    const refreshToken = await StorageHelper.get<string>('refreshToken');

    console.log('refreshToken', refreshToken);

    if (!refreshToken) {
      return null;
    }

    // Use the same URL logic as the main client
    const baseURL = Platform.OS === 'web' && __DEV__ ? API_URL_DEV : API_URL;
    const refreshURL = `${baseURL}/auth/refresh`;

    console.log('🔍 Refresh token URL:', refreshURL);

    const response = await fetch(refreshURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const result = await response.json();

    if (result.token) {
      await StorageHelper.set<string>('accessToken', result.token);
      await StorageHelper.set<string>('refreshToken', result.refreshToken);

      return result.token;
    } else {
      console.error('Token refresh failed');

      return null;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);

    return null;
  }
};

// Main API client
const mainClient = createAxiosClient(API_URL);

// Shared API methods
const createAPI = (client: AxiosInstance) => ({
  setBaseURL: (newBaseURL: string) => {
    client.defaults.baseURL = newBaseURL;
  },
  get: <T>(url: string, params = {}) => client.get<T, AxiosResponse<T>>(url, {params}),
  post: <T>(url: string, data = {}, config?: AxiosRequestConfig<T>) =>
    client.post<T, AxiosResponse<T>>(url, data, config),
  patch: <T>(url: string, data = {}, params = {}) => client.patch<T, AxiosResponse<T>>(url, data, {params}),
  put: <T>(url: string, data = {}, params = {}) => client.put<T, AxiosResponse<T>>(url, data, {params}),
  delete: <T>(url: string, data = {}, params = {}) => client.delete<T, AxiosResponse<T>>(url, {data, params}),
});

// Export APIs
export const api = createAPI(mainClient);
