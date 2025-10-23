import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'title'>

export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected textElement: HTMLElement;
    protected addElementButton: HTMLButtonElement;


    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.addElementButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.addElementButton.addEventListener('click', () => {
            this.events.emit('element:add')
        })
    }

    set image(value: string) {
        this.imageElement.src = String(value);
    }    
    
    set category(value: string) {
        this.categoryElement.textContent = String(value);
    }    
    
    set text(value: string) {
        this.textElement.textContent = String(value);
    }

}