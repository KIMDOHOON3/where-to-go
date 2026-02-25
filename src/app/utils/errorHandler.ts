import axios, { AxiosError } from 'axios';
import { ApiError, ApiErrorType } from '@/app/types/ErrorTypes';
import { ERROR_MESSAGES } from '@/app/constant/errorMessages';

/**
 * Axios 에러를 ApiError로 변환
 */
export const handleAxiosError = (error: unknown, contextMessage?: string): ApiError => {
  // Axios 에러인 경우
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // 네트워크 에러 (서버 응답 없음)
    if (!axiosError.response) {
      if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
        return new ApiError(
          ApiErrorType.TIMEOUT,
          ERROR_MESSAGES.TIMEOUT,
          undefined,
          error
        );
      }
      return new ApiError(
        ApiErrorType.NETWORK_ERROR,
        ERROR_MESSAGES.NETWORK_ERROR,
        undefined,
        error
      );
    }

    // HTTP 상태 코드별 처리
    const status = axiosError.response.status;

    switch (status) {
      case 400:
        return new ApiError(
          ApiErrorType.BAD_REQUEST,
          ERROR_MESSAGES.BAD_REQUEST,
          status,
          error
        );

      case 404:
        return new ApiError(
          ApiErrorType.NOT_FOUND,
          ERROR_MESSAGES.NOT_FOUND,
          status,
          error
        );

      case 429:
        return new ApiError(
          ApiErrorType.RATE_LIMIT,
          ERROR_MESSAGES.RATE_LIMIT,
          status,
          error
        );

      case 500:
      case 502:
      case 503:
      case 504:
        return new ApiError(
          ApiErrorType.SERVER_ERROR,
          ERROR_MESSAGES.SERVER_ERROR,
          status,
          error
        );

      default:
        return new ApiError(
          ApiErrorType.UNKNOWN,
          contextMessage || ERROR_MESSAGES.UNKNOWN,
          status,
          error
        );
    }
  }

  // Axios 에러가 아닌 일반 에러
  if (error instanceof Error) {
    return new ApiError(ApiErrorType.UNKNOWN, error.message, undefined, error);
  }

  // 알 수 없는 에러
  return new ApiError(
    ApiErrorType.UNKNOWN,
    contextMessage || ERROR_MESSAGES.UNKNOWN,
    undefined,
    error
  );
};

/**
 * 개발 환경에서만 에러 로깅
 */
export const logError = (context: string, error: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`❌ [${context}]`, error);
  }
};
