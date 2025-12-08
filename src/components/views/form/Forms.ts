import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Forms<T> extends Component<IProduct & T> {
    protected buttonNext: HTMLButtonElement;
    protected errorContacts: HTMLElement;
    // protected event: HTMLFormElement;
    
    constructor(container: HTMLElement, events?: IEvents) {
        super(container);
        this.errorContacts = ensureElement<HTMLElement>('.form__errors', this.container);
        this.buttonNext = ensureElement<HTMLButtonElement>('.button', this.container);
        // this.event = ensureElement<HTMLFormElement>('.form', this.container);
    
        // this.container.addEventListener('submit', (e: Event) => {
        //     e.preventDefault();
        //     this.event.emit(`${this.container.getAttribute('name')}:submit`);
        // })
    };

    set valid(value: boolean) {
        this.buttonNext.disabled = value;
    };
    set errors(value: string) {
        this.errorContacts.textContent = value;
    };
}