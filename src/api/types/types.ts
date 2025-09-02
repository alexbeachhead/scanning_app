export interface Response<T, P = string> {
  data: T | null;
  error: P | null;
}

export interface IErrorResponse<E> {
  status: number;
  errors: E;
}

export interface IUnauthorizedErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
export interface IValidateReject {
  rejectValue: {message: string; errors: string[]};
}
