import { IBuyer } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

export class BuyerModel {
    private buyer: Partial<IBuyer> = {};

    constructor(protected events: IEvents, buyer?: IBuyer) {
        this.buyer = buyer ?? {};
    } 

    saveBuyerData<key extends keyof IBuyer>(key: key, value: IBuyer[key]): void {
        if(!this.buyer) {
            this.buyer = {} as IBuyer;
        }
        this.buyer[key] = value;
        this.events.emit('buyer:changed');
    }

    getBuyerData(): IBuyer | null {
        if (this.buyer) {
            return this.buyer as IBuyer;
        }
        return null;
    }

    clearBuyerData(): void {
        this.buyer = {};
        this.events.emit('buyer:changed');
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