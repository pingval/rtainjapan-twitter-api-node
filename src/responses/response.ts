type Response<T, C extends number> = {
  code: C;
  data: T;
};

type SuccessResponse<T> = Response<T, 0>;

export const response = {
  success: (data: any): SuccessResponse<typeof data> => ({code: 0, data}),
}