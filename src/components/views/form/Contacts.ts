import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Forms } from "./Forms";

export type TContacts = Pick<IBuyer, 'email' | 'phone'>

export class Contacts extends Forms<TContacts> {
    protected emailBuyer: HTMLElement;
    protected phoneBuyer: HTMLElement;
   

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.emailBuyer = ensureElement<HTMLElement>('input[name="email"]', this.container);
        this.phoneBuyer = ensureElement<HTMLElement>('input[name="phone"]', this.container);
    }
    
    set email(value: string) {
        this.emailBuyer.textContent = value;
    }

    set phone(value: string) {
        this.phoneBuyer.textContent = value;
    }

}