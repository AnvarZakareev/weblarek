import { IProduct } from '../../../types/index.ts';

export class ProductCatalog {
    ProductArray: IProduct[];
    ProductSelected: IProduct;
    constructor(ProductArray: IProduct[], ProductSelected: IProduct)
    {
        this.ProductArray = ProductArray;
        this.ProductSelected = ProductSelected
    }
    saveArray(ProductArray: IProduct[]) {
        this.ProductArray = ProductArray;
    }
    getArray(): IProduct[] {
        return this.ProductArray;
    }
    getProductById(id: string): IProduct | undefined {
        return this.ProductArray.find(IProduct => IProduct.id == id);
    }
    saveProductSelected(IProduct: IProduct): IProduct {
        this.ProductSelected = IProduct;
        return this.ProductSelected
    }
    getProductSelected(): IProduct {
        return this.ProductSelected
    }
}