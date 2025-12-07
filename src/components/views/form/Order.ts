import { IBuyer, TPayment } from "../../../types"
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Forms } from "./Forms"


// export type TOrder = Pick<IBuyer, 'payment' | 'address'>;

export interface X {
    payment: TPayment,
    address: string
}

export class Order extends Forms<X> {
    protected buttonNodes: HTMLButtonElement[];
    protected addressBuyer: HTMLInputElement;


    constructor(container: HTMLElement, protected events: IEvents){
        super(container, events);

        this.buttonNodes = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addressBuyer = ensureElement<HTMLInputElement>('.form__input', this.container);


        this.buttonNodes.forEach( button => {
            button.addEventListener('click', () => {
                this.events.emit('form:changed', {key: 'payment', value: button.name});
            });
        })
        this.addressBuyer.addEventListener('input', () => {
            this.events.emit('form:changed', { key: 'address', value: this.addressBuyer.value})
        });
    };

    set payment(value: TPayment) {
        console.log(value);
        console.log('test value');
        this.buttonNodes.forEach((button: HTMLButtonElement) => {
            const buttonName = button.name as TPayment;
            if (buttonName == value) {
                console.log('button_alt-active')
                button.classList.add('button_alt-active');
            };
        });
    };
    set address(value: string) {
        this.addressBuyer.value = value;
    };

}