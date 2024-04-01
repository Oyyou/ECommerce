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

export interface IBasket {
  ownerId: string;
  items: {
    id: number;
    qty: number;
  }[]
}