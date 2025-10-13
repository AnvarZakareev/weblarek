// import type { TPayment } from '../../../types/index.ts';
import { IBuyer } from '../../../types/index.ts';

export class Buyer {
    private Buyer: IBuyer | null;
    constructor(Buyer?: IBuyer) {
        this.Buyer = Buyer ?? null;
    } 
    // constructor (Buyer: IBuyer) {
    //     this.Buyer = Buyer;
    // }
    saveBuyerData<key extends keyof IBuyer>(key: key, value: IBuyer[key]): void {
        if(!this.Buyer) {
            this.Buyer = {} as IBuyer;
        }
        this.Buyer[key] = value;
    }
    getBuyerData(): IBuyer | null {
        if (this.Buyer) {
            return this.Buyer as IBuyer;
        }
        return null;
    }
    clearBuyerData(): void {
        this.Buyer = null;
    }
    validBuyerData(): { [K in keyof IBuyer]?: string } {
        const errors: { [key in keyof IBuyer]?: string } = {};
        if (!this.Buyer?.payment || this.Buyer.payment.trim() === "") {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.Buyer?.email || this.Buyer.email.trim() === "") {
            errors.email = 'Укажите емэйл';
        }
        if (!this.Buyer?.phone || this.Buyer.phone.trim() === "") {
            errors.phone = 'Укажите телефон';
        }
        if (!this.Buyer?.address || this.Buyer.address.trim() === "") {
            errors.address = 'Укажите адрес';
        }
        return errors;
    }
}