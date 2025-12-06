import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Forms<T> extends Component<IProduct & T> {
    protected buttonNext: HTMLButtonElement;
    protected errorContacts: HTMLElement;
    
    constructor(events: IEvents, container: HTMLElement) {
        super(container);
        this.errorContacts = ensureElement<HTMLElement>('.form__errors', this.container)
        this.buttonNext = ensureElement<HTMLButtonElement>('.button', this.container);
    
        this.buttonNext.addEventListener('click', () => {
            events.emit('order:post');
            console.log('order:post');
        });
    
    }

    set valid(value: boolean) {
        this.buttonNext.disabled = value;
    };
    set errors(value: string) {
        this.errorContacts.textContent = value;
    };
}