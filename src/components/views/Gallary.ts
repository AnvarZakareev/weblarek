import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallary {
    catalog: HTMLElement[]
}

export class Gallery<T> extends Component<IGallary & T> {
    // protected catalogElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);

        // this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    set catalog(value: HTMLElement[]) {
        this.container.replaceChildren(...value);
        // генерация события
    }
}