import { IProduct } from '../../types/index.ts';

export class BasketModel {
    private productArrayInBasket: IProduct[];

    constructor(productArrayInBasket: IProduct[] = []) 
    {
        this.productArrayInBasket = productArrayInBasket;
    }

    getProductArrayInBasket(): IProduct[] {
        return this.productArrayInBasket;
    }

    addProductInBasket(product: IProduct) {
            this.productArrayInBasket.push(product);
    }

    delProductInBasket(delProduct: IProduct) {
        const originalLength = this.productArrayInBasket.length;
        this.productArrayInBasket = this.productArrayInBasket.filter(product => product.id !== delProduct.id);
        return this.productArrayInBasket.length < originalLength;
    }

    clearBasket() {
        this.productArrayInBasket = [];
    }

    getTotalPrice(): number {
        return this.productArrayInBasket.reduce((total, item) => total + (item.price || 0), 0);
    }

    getLengthProductInBasket(): number {
        return this.productArrayInBasket.length;
    }
    
    checkProductInBasketById(id: string): boolean {
        return this.productArrayInBasket.some(product => product.id === id);
    }
}