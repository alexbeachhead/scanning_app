import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL_STORE, API_URL_USER } from "@env";
import { StorageHelper } from "../utils/helpers/storage";
import { Response } from "src/types/types";

// Helper to create a configured Axios client
const createAxiosClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({ baseURL });

  client.interceptors.request.use(async (config) => {
    const accessToken = await StorageHelper.get<string>("accessToken");

    console.log("accessToken", accessToken);

    if (accessToken) {
      config.headers["x-authorization"] = `Bearer ${accessToken}`;
    }
    config.headers.Authorization = "Basic " + "eDQ6eDRwYXNEZWZhdWx0NjY2Ng==";

    return config;
  }, Promise.reject);

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshedToken = await refreshToken();

          if (refreshedToken) {
            originalRequest.headers["x-authorization"] = `Bearer ${refreshedToken}`;

            return await client(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Refresh token logic
const refreshToken = async () => {
  try {
    const refreshToken = await StorageHelper.get<string>("refreshToken");

    console.log("refreshToken", refreshToken);

    if (!refreshToken) {
      return null;
    }

    const response = await fetch(API_URL_USER + "/updateTokens", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        Authorization: "Basic " + "eDQ6eDRwYXNEZWZhdWx0NjY2Ng==",
      },
    });

    const result = await response.json();

    if (result.tokeninfo.access_token && result.tokeninfo.refresh_token) {
      await StorageHelper.set<string>("accessToken", result.tokeninfo.access_token);
      await StorageHelper.set<string>("refreshToken", result.tokeninfo.refresh_token);

      return result.tokeninfo.access_token;
    } else {
      console.error("Token refresh failed");

      return null;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);

    return null;
  }
};

// Main API client
const mainClient = createAxiosClient(API_URL_USER);

// Additional API client
const additionalClient = createAxiosClient(API_URL_STORE);

// Shared API methods
const createAPI = (client: AxiosInstance) => ({
  setBaseURL: (newBaseURL: string) => {
    client.defaults.baseURL = newBaseURL;
  },
  get: <T>(url: string, params = {}) => client.get<T, AxiosResponse<T>>(url, { params }),
  post: <T>(url: string, data = {}, config?: AxiosRequestConfig<T>) =>
    client.post<T, AxiosResponse<T>>(url, data, config),
  patch: <T>(url: string, data = {}, params = {}) =>
    client.patch<T, AxiosResponse<T>>(url, data, { params }),
  put: <T>(url: string, data = {}, params = {}) =>
    client.put<T, AxiosResponse<T>>(url, data, { params }),
  delete: <T>(url: string, data = {}, params = {}) =>
    client.delete<T, AxiosResponse<T>>(url, { data, params }),
});

// Export APIs
export const api = createAPI(mainClient);
export const storeApi = createAPI(additionalClient);

export async function handleApiCall<T, E = any>(apiPromise: Promise<any>): Promise<Response<T, E>> {
  try {
    const response = await apiPromise;

    console.log("response", response.data);

    // Check if response.data exists
    if (!response.data && response.code !== 200) {
      return { data: null, error: { message: "No response data" } as unknown as E };
    }

    const { process, code, ...responseData } = response.data;

    if (process && code == 200) {
      // Return the data without process and code fields
      // console.log("responseData", responseData);

      return { data: responseData as T, error: null };
    } else {
      // Return error with the response data
      return {
        data: null,
        error: {
          ...responseData,
          process,
          code,
          message: responseData.message || "Request failed",
        } as unknown as E,
      };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err.response?.data;

      return { data: null, error };
    }

    // For non-Axios errors, return a generic error
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : "Unknown error" } as unknown as E,
    };
  }
}
