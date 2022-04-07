type SuccessResponse<T> = {
  code: 0;
  data: T;
};

export const makeSuccess = (data: any): SuccessResponse<typeof data> => {
  return {
    code: 0,
    data
  };
}