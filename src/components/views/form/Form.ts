import { IProduct } from "../../../types";
import { Component } from "../../base/Component";

export class Form<T> extends Component<IProduct> {
    constructor(container: HTMLElement) {
        super(container)
    }
}