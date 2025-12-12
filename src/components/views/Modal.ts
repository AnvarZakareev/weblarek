import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected modalContent: HTMLElement;
    protected modalButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
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
        this.modalContent.innerHTML = '';
        this.modalContent.appendChild(value);
    }

    public closeModal(): void {
        this.container.style.display = 'none';
    }
    
    public showModal(): void {
        this.container.style.display = 'block';
    }
};