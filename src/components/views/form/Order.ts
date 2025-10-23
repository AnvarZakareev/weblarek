import { IBuyer, TPayment } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Forms } from "./Forms"


export type TOrder = Pick<IBuyer, 'payment' | 'address'>

export class Order extends Forms<TOrder> {
    protected buttonPayment: HTMLButtonElement;
    protected adresBuyer: HTMLInputElement;
    protected buttonNext: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement){
        super(container);

        this.buttonPayment = ensureElement<HTMLButtonElement>('.button_alt', this.container);
        this.adresBuyer = ensureElement<HTMLInputElement>('.form__input', this.container);
        this.buttonNext = ensureElement<HTMLButtonElement>('.basket__item-index', this.container);
        
        this.buttonNext.addEventListener('click', () => {
            this.events.emit('form:send')
        })
    }

    // set payment(value: TPayment) {
    //     this.payment.
    // }


    set address(value: string) {
        this.adresBuyer.textContent = value;
    }


}