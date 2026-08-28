export type ApiResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  data: T | null;
  errors: Record<string, any>[] | null;
  meta: Record<string, any> | null;
};

export function successResponse<T>(
  data: T,
  message = "Operación exitosa",
  code = 200,
  meta: Record<string, any> | null = null,
): ApiResponse<T> {
  return { success: true, code, message, data, errors: null, meta };
}

export function errorResponse(
  message: string,
  code = 400,
  errors: Record<string, any>[] | null = null,
): ApiResponse<null> {
  return { success: false, code, message, data: null, errors, meta: null };
}
