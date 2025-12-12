import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { CDN_URL } from "../../../utils/constants";

type ICardActions = {
  onClick?: (event: Event) => void;
}

export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'>

export class CardPreview extends Card<TCardPreview> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected descriptionElement: HTMLElement;
    protected addElementButton: HTMLButtonElement;


    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.addElementButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        if(actions?.onClick) {
            this.addElementButton.addEventListener('click', actions.onClick);
        }
    }

    set image(value: string) {
        this.imageElement.src = CDN_URL+value;
        this.imageElement.alt = 'Изображение товара';
    }
    
    set category(value: string) {
        this.categoryElement.textContent = String(value);
    }
    
    set description(value: string) {
        this.descriptionElement.textContent = String(value);
    }

    set buttonText(value: string) {
        this.addElementButton.textContent = value;
    }

    set buttonDisabled(value: boolean) {
        this.addElementButton.disabled = value;
    }
}