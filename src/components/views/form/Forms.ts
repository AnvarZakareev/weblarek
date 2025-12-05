import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Forms<T> extends Component<IProduct & T> {
    protected button: HTMLButtonElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(container);

        this.button = ensureElement<HTMLButtonElement>('.button', this.container)

        this.button.addEventListener('click', () => {
            events.emit('test');
            console.log('test');
        });
    }

}