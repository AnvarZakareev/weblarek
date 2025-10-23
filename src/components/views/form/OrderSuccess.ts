import { IBuyer } from "../../../types"
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export type TOrderSuccess = IBuyer

export class OrderSuccess extends Component<TOrderSuccess> {
    protected buttonRestart: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.buttonRestart = ensureElement<HTMLButtonElement>('.order-success__close', this.container)
    
        this.buttonRestart.addEventListener('click', () => {
            this.events.emit('any')
        })
    }
}