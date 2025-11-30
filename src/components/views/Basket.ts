import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
    cards: HTMLElement;
    sum: number;
}

export class Basket extends Component<IBasket> {
    protected basketPrice: HTMLElement;
    protected designButtom: HTMLButtonElement;
    protected list: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.basketPrice = ensureElement<HTMLElement>('.basket__price', this.container);
        this.list = ensureElement<HTMLElement>('.basket__list', this.container);
        this.designButtom = ensureElement<HTMLButtonElement>( '.basket__button', this.container);
        
        this.designButtom.addEventListener('click', () => {
            this.events.emit('basket:close')
        })
        
    }

    set sum(value: number) {
        this.basketPrice.textContent = String(value)
    }

    set cards(value: HTMLElement) {
        this.list = value
        // генерация события
    }
}