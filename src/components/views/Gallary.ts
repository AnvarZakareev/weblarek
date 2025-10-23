import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallary {
    catalog: HTMLUListElement
}

export class Gallery<T> extends Component<IGallary> {
    protected catalogElement;

    constructor(container: HTMLElement) {
        super(container);

        this.catalogElement = ensureElement<HTMLUListElement>('.gallery', this.container);
    }

    set catalog(value: HTMLUListElement) {
        this.catalogElement = value
    }
}