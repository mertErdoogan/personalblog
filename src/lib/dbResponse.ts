import { ApiResponse } from "../../types/api-response";

export const createResponse = <T>(
  message: string,
  data: T | null,
  success: boolean,
) => {
  const response: ApiResponse<T> = { message, data, success };
  return { ...response };
};