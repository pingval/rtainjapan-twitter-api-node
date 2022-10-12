type Response<T, C extends number> = {
  code: C;
  data: T;
};

export type SuccessResponse<T> = Response<T, 0>;

export default {
  success: <T>(data: T): SuccessResponse<T> => ({code: 0, data})
}
