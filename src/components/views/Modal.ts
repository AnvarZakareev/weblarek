import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
    content: HTMLElement;
}

export class Modal extends Component<IModal> {
    protected modalContainer: HTMLElement;
    protected modalButtom: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);

        this.modalContainer = ensureElement<HTMLElement>('.modal__content', this.container);
        this.modalButtom = ensureElement<HTMLButtonElement>('.modal__close', this.container);

        this.modalButtom.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
    }

    set content(value: HTMLElement) {
        this.modalContainer = value;
        // генерация события
    }
};

//     public open() {
//         this.container.style.display = 'block';
//     }

//     public close() {
//         this.container.style.display = 'none';
// }