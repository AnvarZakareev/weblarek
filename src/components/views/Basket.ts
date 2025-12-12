import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    cards: HTMLElement[];
    sum: number;
}

export class Basket extends Component<IBasket> {
    protected basketPrice: HTMLElement;
    protected designButtom: HTMLButtonElement;
    protected list: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents, ) {
        super(container);

        this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);
        this.list = ensureElement<HTMLElement>('.basket__list', this.container);
        this.designButtom = ensureElement<HTMLButtonElement>( '.basket__button', this.container);
        
        this.designButtom.addEventListener('click', () => {
            this.events.emit('order:start');
        })

        this.designButtom.disabled = true;
    }
    
    set sum(value: number) {
        this.basketPrice.textContent = `${value} синапсов`;
        if (value > 0) {
          this.designButtom.disabled = false;
        }
        else {
          this.designButtom.disabled = true;
        }
    }

    set cards(value: HTMLElement[]) {
        this.list.innerHTML = '';
        value.forEach(card => {
            this.list.appendChild(card);
        });
    }
}