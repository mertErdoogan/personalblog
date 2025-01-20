/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ApiResponse } from "../types/api-response";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
  timeout: 10000,
});

export const apiRequest = async <T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  params?: Record<string, any>,
  data?: any,
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.request<ApiResponse<T>>({
    url,
    method,
    params,
    data,
  });
  return response.data;
};