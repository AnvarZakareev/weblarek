import { IApi, IProductList, IBuyerExtended } from '../../types/index';


export class CompositionAPI {
    api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async fetchProducts(): Promise<IProductList> {
        return await this.api.get<IProductList>('/product/');
    }
    
    async sendOrder(orderData: IBuyerExtended): Promise<{id: string, total: number}> {
        return await this.api.post<{id: string, total: number}>('/order/', orderData);
    }
}