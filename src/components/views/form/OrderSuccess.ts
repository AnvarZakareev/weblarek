import { IBuyer } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export type TOrderSuccess = IBuyer

export class OrderSuccess extends Component<TOrderSuccess> {
    protected buttonSucess: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.buttonSucess = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
    
        this.buttonSucess.addEventListener('click', () => {
            events.emit('order:complete');
            console.log('order:complete');
        });
    }
}