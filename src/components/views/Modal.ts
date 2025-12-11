import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected modalContainer: HTMLElement;
    protected modalButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.modalContainer = ensureElement<HTMLElement>('.modal__content', this.container);
        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.modalButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
        this.container.addEventListener('click',  (event) => {
            if (event.target === this.container) {
                this.events.emit('modal:close');
            }
        })
    }

    set content(value: HTMLElement) {
        this.modalContainer.innerHTML = '';
        this.modalContainer.appendChild(value);
    }
};