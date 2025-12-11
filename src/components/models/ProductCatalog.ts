import { IProduct } from '../../types/index.ts';
import { IEvents } from '../base/Events.ts';

export class ProductCatalogModel {
    protected productArray: IProduct[];
    protected productSelected: IProduct | null;
    protected events: IEvents; 
// Обратите внимание.
// Во всех классах вы не будете получать в конструктор готовые данные. 
// Все экземпляры классов создаются до появления данных 
// и заполняются данными в процессе работы приложения.
    constructor(events: IEvents, productArray: IProduct[] = [], productSelected: IProduct | null = null)
    {
        this.events = events;
        this.productArray = productArray;
        this.productSelected = productSelected;
    }

    setItems(productArray: IProduct[]) : void {
        this.productArray = productArray;
        this.events.emit('catalog:changed', {})
    }

    getItems(): IProduct[] {
        return this.productArray;
    }

    getProductById(id: string): IProduct | undefined {
        return this.productArray.find(IProduct => IProduct.id == id);
    }

    saveProductSelected(IProduct: IProduct | undefined): IProduct | null{
        if (!IProduct) {
            this.productSelected = null;
            return null;
        }
        this.productSelected = IProduct;
        return this.productSelected
    }
    
    getProductSelected(): IProduct | null {
        return this.productSelected
    }
}