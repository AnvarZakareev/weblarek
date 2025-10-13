import { IProduct } from '../../types/index.ts';

export class Basket {
    private ProductArrayInBasket: IProduct[];
    constructor(ProductArrayInBasket: IProduct[] = []) 
    {
        this.ProductArrayInBasket = ProductArrayInBasket;
    }
    getProductArrayInBasket(): IProduct[] {
        return this.ProductArrayInBasket;
    }
    addProductInBasket(Product: IProduct | undefined) {
        if (Product !== undefined) {
            this.ProductArrayInBasket.push(Product);
        }
    }
    delProductInBasket(DelProduct: IProduct | undefined) {
        if (DelProduct === undefined) return false;
        const index = this.ProductArrayInBasket.findIndex(product => product.id === DelProduct.id);
        if (index !== -1) {
            this.ProductArrayInBasket.splice(index, 1);
            return true;
        }
        else return false
    }
    clearBasket() {
        this.ProductArrayInBasket = [];
    }
    summProductInBasket(): number {

        let sum = 0
        this.ProductArrayInBasket.forEach(element => {
            if (typeof element.price === 'number')
            {sum += element.price}
        }
        );
        return sum;
    }
    getLengthProductInBasket(): number {
        return this.ProductArrayInBasket.length;
    }
    checkProductInBasketById(id: string): boolean {
        return this.ProductArrayInBasket.some(product => product.id === id);
    }
}