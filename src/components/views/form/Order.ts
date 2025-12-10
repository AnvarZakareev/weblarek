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
    // protected buttonNext: HTMLButtonElement;


    constructor(container: HTMLElement, protected events: IEvents){
        super(container, events);

        this.buttonNodes = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addressBuyer = ensureElement<HTMLInputElement>('.form__input', this.container);
        // this.buttonNext = ensureElement<HTMLButtonElement>('.order__button', this.container);

        this.buttonNodes.forEach( button => {
            button.addEventListener('click', () => {
                this.events.emit('form:changed', {key: 'payment', value: button.name});
            });
        });
        
        this.addressBuyer.addEventListener('input', () => {
            this.events.emit('form:changed', { key: 'address', value: this.addressBuyer.value})
        });

        // const form = ensureElement<HTMLFormElement>('.form', this.container);
        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();
        //     console.log('Форма отправлена!');
        // });
        // console.log(container)
        // console.log(this.container)
        // this.container.querySelector('form')?.addEventListener('submit', (e: Event) => {
        //     console.log('submit');

        //     e.preventDefault();
        //     // this.events.emit(`${this.container.getAttribute('name')}:submit`);
        // });
        // this.buttonNext.addEventListener('click', () => {
        //     events.emit('order:next');
        // });
    };

    set payment(value: TPayment) {
        this.buttonNodes.forEach((button: HTMLButtonElement) => {
            const buttonName = button.name as TPayment;
            if (buttonName == value) {
                button.classList.add('button_alt-active');
            }
            else {
                button.classList.remove('button_alt-active');
            };
        });
    };
    set address(value: string) {
        this.addressBuyer.value = value;
    };
}