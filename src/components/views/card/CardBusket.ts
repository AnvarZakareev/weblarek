import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

type ICardActions = {
  onClick?: (event: Event) => void;
}

export type ICardInBusket = {
    item: number
}

export class CardInBusket extends Card<ICardInBusket> {
    protected itemElement: HTMLElement;
    protected deleteElementButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.itemElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteElementButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
        
        if(actions?.onClick) {
            this.deleteElementButton.addEventListener('click', actions.onClick);
        }
    };

    set item(value: number) {
        this.itemElement.textContent = String(value);
    }
}