export interface IApiResponse<TData> {
  data?: TData;
  error?: any;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface ICart {
  items: ICartItem[]
}

export interface ICartItem {
  id: number;
  qty: number;
}