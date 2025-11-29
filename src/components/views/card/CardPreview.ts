import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'>

export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected addElementButton: HTMLButtonElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.addElementButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.addElementButton.addEventListener('click', () => {
            this.events.emit('basket:add', this.container)
        })
    }

    set image(value: string) {
        this.imageElement.src = String(value);
        // генерация события
    }    
    
    set category(value: string) {
        this.categoryElement.textContent = String(value);
        // генерация события
    }    
    
    set description(value: string) {
        this.descriptionElement.textContent = String(value);
        // генерация события
    }

}