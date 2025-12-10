import { IBuyer } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export type TOrderSuccess = IBuyer

export class OrderSuccess extends Component<TOrderSuccess> {
    protected buttonSucess: HTMLButtonElement;
    protected messageSucess: HTMLElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.buttonSucess = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
        this.messageSucess = ensureElement<HTMLElement>('.order-success__description', this.container)

        this.buttonSucess.addEventListener('click', () => {
            events.emit('order:complete');
        });
    }

    set message(value: number) {
        this.messageSucess.textContent = `Списано ${value} синапсов`;
    };
}
