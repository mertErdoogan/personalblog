import { NextResponse } from "next/server";
import { ApiResponse } from "../../types/api-response";

export const createResponse = <T>(
  message: string,
  data: T | null,
  success: boolean,
  status: number
) => {
  const response: ApiResponse<T> = { message, data, success };
  return NextResponse.json(response, { status });
};