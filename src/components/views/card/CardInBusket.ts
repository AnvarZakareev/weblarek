import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardInBusket extends Card<IProduct> {
    protected itemElement: HTMLElement;
    protected deleteElementButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement,) {
        super(container);

        this.itemElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteElementButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)
    
        this.deleteElementButton.addEventListener('click', () => {
            this.events.emit('element:delete')
        })
    }

    // set deleteElementButton(value: void) {

    // }
}