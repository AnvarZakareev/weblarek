import { IProduct } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";
import { CDN_URL_WORKS } from "../../../utils/constants";

type ICardActions = {
  onClick?: (event: Event) => void;
}

// const categoryMap = {
//     'софт-скил': 'card__category-hard',
//     'хард-скил': 'card__category-soft',
//     'кнопка': 'card__category-button',
//     'дополнительное': 'card__category-additional',
//     'другое': 'card__category-other',
// }

type CategoryKey = keyof typeof categoryMap;
export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

export class CardCatalog extends Card<TCardCatalog> {
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        if(actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
        }
    }

    set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(
                categoryMap[key as CategoryKey],
                key === value
            );
        }
    }

    set image(value: string) {
        this.imageElement.src = CDN_URL_WORKS+value;
        this.imageElement.alt = 'Изображение товара';
    }

// set image(value: string) {
//     this.imageElement.src = value;
//     if (this.imageElement) {
//     } else {
//         console.error('Элемент изображения не найден');
//     }
// }
}