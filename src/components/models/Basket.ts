import { IProduct } from '../../types/index.ts';
import { EventEmitter } from '../base/Events.ts';

export class BasketModel {
    private productArrayInBasket: IProduct[];
    private events: EventEmitter;

    constructor(productArrayInBasket: IProduct[] = [], events: EventEmitter) 
    {
        this.productArrayInBasket = productArrayInBasket;
        this.events = events;
    }

    getProductArrayInBasket(): IProduct[] {
        return this.productArrayInBasket;
    }

    addProductInBasket(product: IProduct) {
        this.productArrayInBasket.push(product);
        this.events.emit('basket:changed');
    }

    delProductInBasket(delProduct: IProduct) {
        const originalLength = this.productArrayInBasket.length;
        this.productArrayInBasket = this.productArrayInBasket.filter(product => product.id !== delProduct.id);
        this.events.emit('basket:changed');
        return this.productArrayInBasket.length < originalLength;
    }

    clearBasket() {
        this.productArrayInBasket = [];
        this.events.emit('basket:clear');
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