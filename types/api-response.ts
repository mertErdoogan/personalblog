// types/api-response.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
    message: string;
    data: T | null;
    success: boolean;
  }