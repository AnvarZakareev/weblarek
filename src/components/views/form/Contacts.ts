import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Forms } from "./Forms";

export type TContacts = Pick<IBuyer, 'email' | 'phone'>

export class Contacts extends Forms<TContacts> {
    protected emailBuyer: HTMLElement;
    protected phoneBuyer: HTMLElement;
    protected buttonPay: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.emailBuyer = ensureElement<HTMLElement>('#email', this.container)
        this.phoneBuyer = ensureElement<HTMLElement>('#phone', this.container)
        this.buttonPay = ensureElement<HTMLButtonElement>('.button', this.container)

        this.buttonPay.addEventListener('click', () => {
            this.events.emit('form:pay')
        })
    }
    
    set email(value: string) {
        this.emailBuyer.textContent = value;
    }

    set phone(value: string) {
        this.phoneBuyer.textContent = value;
    }
}