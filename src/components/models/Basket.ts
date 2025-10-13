import { IProduct } from '../../types/index.ts';

export class Basket {
    private productArrayInBasket: IProduct[];

    constructor(productArrayInBasket: IProduct[] = []) 
    {
        this.productArrayInBasket = productArrayInBasket;
    }

    getProductArrayInBasket(): IProduct[] {
        return this.productArrayInBasket;
    }

    addProductInBasket(product: IProduct | undefined) {
        if (product !== undefined) {
            this.productArrayInBasket.push(product);
        }
    }

    delProductInBasket(delProduct: IProduct | undefined) {
        if (delProduct === undefined) return false;
        const index = this.productArrayInBasket.findIndex(product => product.id === delProduct.id);
        if (index !== -1) {
            this.productArrayInBasket.splice(index, 1);
            return true;
        }
        else return false
    }

    clearBasket() {
        this.productArrayInBasket = [];
    }

    summProductInBasket(): number {

        let sum = 0
        this.productArrayInBasket.forEach(element => {
            if (typeof element.price === 'number')
            {sum += element.price}
        }
        );
        return sum;
    }

    getLengthProductInBasket(): number {
        return this.productArrayInBasket.length;
    }
    
    checkProductInBasketById(id: string): boolean {
        return this.productArrayInBasket.some(product => product.id === id);
    }
}