import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Forms<T> extends Component<IProduct & T> {
    protected buttonNext: HTMLButtonElement;
    protected errorContacts: HTMLElement;
    // protected form: HTMLFormElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        // console.log('container:', this.container);
        // console.log('event listener добавлен');
        // console.log('Контейнер:', this.container);
        // console.log('Имя формы:', this.container.getAttribute('name'));
        this.errorContacts = ensureElement<HTMLElement>('.form__errors', this.container);
        this.buttonNext = ensureElement<HTMLButtonElement>('.button', this.container);

        // this.form = this.container.getElementsByClassName('.form').item ;
        // this.form = ensureElement<HTMLFormElement>('.form', this.container);

        // console.log(this.form)

        // this.buttonNext.addEventListener('click', () => {
        //     console.log(`${this.container.getAttribute('name')}:submit`);
        // })
        // // console.log(`${this.container.getAttribute('name')}:submit`);
        
        // container.addEventListener('submit', () => {
        //     console.log(`${this.container.getAttribute('name')}:submit`);
        //     events.emit(`${this.container.getAttribute('name')}:submit`)
        // })
        
        // // console.log('Form element:', this.form);
        // this.form.addEventListener('submit', (e: Event) => {
        //     console.log(e);
        //     console.log(`${this.container.getAttribute('name')}:submit`);
        //     e.preventDefault();
        //     events.emit(`${this.container.getAttribute('name')}:submit`);
        // })
    };

    set valid(value: boolean) {
        this.buttonNext.disabled = value;
    };

    set errors(value: string) {
        this.errorContacts.textContent = value;
    };
}