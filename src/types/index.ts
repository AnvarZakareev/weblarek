export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Ответ от сервера
export interface IProductList {
  total: number;
  items: IProduct[]
}

// Товар:
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Способ оплаты:
export type TPayment = "card" | "cash" | "";	

// Покупатель:
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
} 