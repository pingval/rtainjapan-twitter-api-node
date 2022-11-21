type Response<T, C extends number> = {
  code: C;
} & T;

export type SuccessResponse<T> = Response<{
  data: T,
}, 0>;

export type FailureResponse = Response<{
  error: {message: string}
}, 10>;

export default {
  success: <T>(data: T): SuccessResponse<T> => ({code: 0, data}),
  failure: (message: string): FailureResponse => ({code: 10, error: {message}}),
}
