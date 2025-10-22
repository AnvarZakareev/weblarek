import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";


interface IBasket {
    cards: Card[];
    allPrice: number;
}

export class Basket extends Component<IBasket> {
    protected designButtom: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.elmt = ensureElement<HTMLElement>(
            '.basket__list'
            this.elmt
        );
        this.designButtom = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this.container
        );
        
        this.designButtom
        
    }

    set sum(value: number) {

    }

    set cards(item: Card[])
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