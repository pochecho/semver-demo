interface codeModel {
  code: number,
  message: string
}

export interface BcGenericResponseModel<T> {
  code: codeModel;
  data: T;
}
