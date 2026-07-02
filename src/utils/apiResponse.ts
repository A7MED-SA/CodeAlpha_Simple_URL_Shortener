export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: string[]
}

export function successResponse<T>(data: T, message = 'Success'): ApiResponse<T> {
  return { success: true, message, data }
}

export function errorResponse(message: string, errors?: string[]): ApiResponse {
  return { success: false, message, ...(errors ? { errors } : {}) }
}
