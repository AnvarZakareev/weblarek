import { IProduct } from '../../types/index.ts';

export class ProductCatalog {
    ProductArray: IProduct[];
    ProductSelected: IProduct | null;
    constructor(ProductArray: IProduct[] = [], ProductSelected?: IProduct)
    {
        this.ProductArray = ProductArray;
        this.ProductSelected = ProductSelected ?? null;
    }
    setItems(ProductArray: IProduct[]) : void {
        this.ProductArray = ProductArray;
    }
    getItems(): IProduct[] {
        return this.ProductArray;
    }
    getProductById(id: string): IProduct | undefined {
        return this.ProductArray.find(IProduct => IProduct.id == id);
    }
    saveProductSelected(IProduct: IProduct | undefined): IProduct | null{
        if (!IProduct) {
            this.ProductSelected = null;
            return null;
        }
        this.ProductSelected = IProduct;
        return this.ProductSelected
    }
    getProductSelected(): IProduct | null {
        return this.ProductSelected
    }
}