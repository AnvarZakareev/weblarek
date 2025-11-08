import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
// import { Component } from "../../base/Component";
import { Gallery } from "../Gallary";

export type ICard = Pick<IProduct,  'price' | 'title'>

export class Card<T> extends Gallery<ICard & T> {
    protected titleElement: HTMLElement;
    protected priceElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this.titleElement.textContent = String(value);
    }
    
    set price(value: number) {
        this.priceElement.textContent = String(value);
    }
}