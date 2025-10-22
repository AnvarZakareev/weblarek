import { ProductCatalog } from "../components/models/ProductCatalog";
import { CardCatalog } from "../components/views/card/CardCatalog";
import { cloneTemplate } from "../utils/utils";

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
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

// Объект, который сервер присылает на запрос товаров
export interface IProductList {
  total: number;
  items: IProduct[]
}

export interface IBuyerExtended extends IBuyer {
  items: string[];
  total: number;
}













// events?.on('catalog:changed', () => {
//   const itemCards = ProductCatalog.getItems().map((item) => {
//     const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
//       onclick: () => events.emit('card:select', item),
//     });
//     return card.render({ catalog: itemCards });
//   });

//   gallery.render({ category: itemCards });
// })

// larekApi
//   .getProductList()
//   .then((data) => {
//     productsModel.setItems(data.items);
//   })
//   .catch((err) => console.log(err));


  
  // --------------
  //    Prsenter
  // --------------