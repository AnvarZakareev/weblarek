import { IApi, IProductList, IProduct, IBuyer } from '../../types/index';
// import { api } from '../base/Api.ts';


export class CompositionAPI {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async fetchProducts(): Promise<IProductList> {
        return await this.api.get<IProductList>('/product/');
    }
    
    async sendOrder(orderData: { products: IProduct[]; buyer: IBuyer }): Promise<any> {
        return await this.api.post('/order/', orderData);
    }
}