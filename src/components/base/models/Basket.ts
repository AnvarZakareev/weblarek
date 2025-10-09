interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export class Basket {
    // хранит массив товаров, выбранных покупателем для покупки
    ProductArrayInBasket: IProduct[];
    // ProductAdded: IProduct;
    // В конструктор передается массив ВЫБРАННЫХ всех товаров
    constructor(ProductArrayInBasket: IProduct[]) 
    {
        this.ProductArrayInBasket = ProductArrayInBasket;
    }
    // получение массива товаров, которые находятся в корзине
    getProductArrayInBasket(): IProduct[] {
        return this.ProductArrayInBasket;
    }
    // добавление товара, который был получен в параметре, в массив корзины
    addProductInBasket(Product: IProduct) {
        this.ProductArrayInBasket.push(Product);
    }
    // удаление товара, полученного в параметре из массива корзины
    delProductInBasket(DelProduct: IProduct) {
        const index = this.ProductArrayInBasket.findIndex(product => product.id === DelProduct.id);
        if (index !== -1) {
            this.ProductArrayInBasket.splice(index, 1);
            return true;
        }
        return false;
    }
    // очистка корзины
    clearProductInBasket() {
        this.ProductArrayInBasket = [];
    }
    // получение стоимости всех товаров в корзине
    summProductInBasket(): number {
        let sum = 0
        this.ProductArrayInBasket.forEach(element => {
            if (element.price != null)
            {sum += element.price}
        }
        );
        return sum;
    }
    // получение количества товаров в корзине
    getLengthProductInBasket(): number {
        return this.ProductArrayInBasket.length;
    }
    // проверка наличия товара в корзине по его id, полученного в параметр метода
    checkProductInBasketById(id: string): boolean {
        return this.ProductArrayInBasket.some(product => product.id === id);
    }
}