export interface IApiResponse<TData> {
  data?: TData;
  error?: any;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
}