import { IApi, IProductList, IProduct, IBuyer } from '../../types/index';
// import { Api } from '../base/Api.ts';


export class CompositionAPI {
    Api: IApi;
    constructor(Api: IApi) {
        this.Api = Api;
    }
    async fetchProducts(): Promise<IProductList> {
        return await this.Api.get<IProductList>('/product/');
    }
    async sendOrder(orderData: { products: IProduct[]; buyer: IBuyer }): Promise<any> {
        return await this.Api.post('/order/', orderData);
    }
}