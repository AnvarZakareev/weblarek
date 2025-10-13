import { IProduct } from '../../types/index.ts';

export class ProductCatalog {
    productArray: IProduct[];
    productSelected: IProduct | null;

    constructor(productArray: IProduct[] = [], productSelected?: IProduct)
    {
        this.productArray = productArray;
        this.productSelected = productSelected ?? null;
    }

    setItems(productArray: IProduct[]) : void {
        this.productArray = productArray;
    }

    getItems(): IProduct[] {
        return this.productArray;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productArray.find(IProduct => IProduct.id == id);
    }

    saveProductSelected(IProduct: IProduct | undefined): IProduct | null{
        if (!IProduct) {
            this.productSelected = null;
            return null;
        }
        this.productSelected = IProduct;
        return this.productSelected
    }
    
    getProductSelected(): IProduct | null {
        return this.productSelected
    }
}