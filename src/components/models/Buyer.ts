// import type { TPayment } from '../../../types/index.ts';
import { IBuyer } from '../../types/index.ts';

export class Buyer {
    private buyer: IBuyer | null;
    constructor(buyer?: IBuyer) {
        this.buyer = buyer ?? null;
    } 
    // constructor (buyer: IBuyer) {
    //     this.buyer = buyer;
    // }
    saveBuyerData<key extends keyof IBuyer>(key: key, value: IBuyer[key]): void {
        if(!this.buyer) {
            this.buyer = {} as IBuyer;
        }
        this.buyer[key] = value;
    }
    getBuyerData(): IBuyer | null {
        if (this.buyer) {
            return this.buyer as IBuyer;
        }
        return null;
    }
    clearBuyerData(): void {
        this.buyer = null;
    }
    validBuyerData(): { [K in keyof IBuyer]?: string } {
        const errors: { [key in keyof IBuyer]?: string } = {};
        if (!this.buyer?.payment || this.buyer.payment.trim() === "") {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.buyer?.email || this.buyer.email.trim() === "") {
            errors.email = 'Укажите емэйл';
        }
        if (!this.buyer?.phone || this.buyer.phone.trim() === "") {
            errors.phone = 'Укажите телефон';
        }
        if (!this.buyer?.address || this.buyer.address.trim() === "") {
            errors.address = 'Укажите адрес';
        }
        return errors;
    }
}