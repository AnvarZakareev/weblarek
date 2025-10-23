import { IProduct } from "../../../types";
import { Component } from "../../base/Component";

export class Forms<T> extends Component<IProduct> {
    constructor(container: HTMLElement) {
        super(container)
    }
}