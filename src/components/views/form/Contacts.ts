import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Forms } from "./Forms";

export type TContacts = Pick<IBuyer, 'email' | 'phone'>

export class Contacts extends Forms<TContacts> {
    protected emailBuyer: HTMLInputElement;
    protected phoneBuyer: HTMLInputElement;
   

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);

        this.emailBuyer = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneBuyer = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    
        this.emailBuyer.addEventListener('input', () => {
            this.events.emit('form:changed', { key: 'email', value: this.emailBuyer.value})
        });
        this.phoneBuyer.addEventListener('input', () => {
            this.events.emit('form:changed', { key: 'phone', value: this.phoneBuyer.value})
        });
    }
    
    set email(value: string) {
        this.emailBuyer.value = value;
    }

    set phone(value: string) {
        this.phoneBuyer.value = value;
    }

}