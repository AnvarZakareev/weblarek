import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { Card } from "./card/Card";


interface IBasket {
    cards: Card;
    sum: number;
}

export class Basket extends Component<IBasket> {
    protected basketPrice: HTMLElement;
    protected designButtom: HTMLButtonElement;
    protected list: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement, list: HTMLElement) {
        super(container);

        this.basketPrice = ensureElement<HTMLElement>(
            '.basket__price',
            this.container
        );
        this.list = ensureElement<HTMLElement>(
            '.basket__list',
            this.container
        );
        this.designButtom = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this.container
        );
        
        this.designButtom
        
    }

    set sum(value: number) {

    }

    set cards(item: null) {
        
    }
}



// -----------
// cards: Card[]
// button: HTMLButtonElement
// allPrice: number
// ----------
// Конструктор:
// cards: Card
// allPrice: number
// this.button = ensureElement<HTMLButtonElement>
// container: HTMLElement
// -----------
// set cards(item: Card[]
// set allPrice(item: number)