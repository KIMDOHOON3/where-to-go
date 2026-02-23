/**
 * API 에러 타입 정의
 */
export enum ApiErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT = 'RATE_LIMIT',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN',
}

/**
 * 커스텀 API 에러 클래스
 */
export class ApiError extends Error {
  type: ApiErrorType;
  status?: number;
  originalError?: unknown;

  constructor(type: ApiErrorType, message: string, status?: number, originalError?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.originalError = originalError;
  }
}
