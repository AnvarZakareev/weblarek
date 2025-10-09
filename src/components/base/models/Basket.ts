interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export class Basket {
    ProductArrayInBasket: IProduct[];
    constructor(ProductArrayInBasket: IProduct[]) 
    {
        this.ProductArrayInBasket = ProductArrayInBasket;
    }
    getProductArrayInBasket(): IProduct[] {
        return this.ProductArrayInBasket;
    }
    addProductInBasket(Product: IProduct) {
        this.ProductArrayInBasket.push(Product);
    }
    delProductInBasket(DelProduct: IProduct) {
        const index = this.ProductArrayInBasket.findIndex(product => product.id === DelProduct.id);
        if (index !== -1) {
            this.ProductArrayInBasket.splice(index, 1);
            return true;
        }
        return false;
    }
    clearProductInBasket() {
        this.ProductArrayInBasket = [];
    }
    summProductInBasket(): number {
        let sum = 0
        this.ProductArrayInBasket.forEach(element => {
            if (element.price != null)
            {sum += element.price}
        }
        );
        return sum;
    }
    getLengthProductInBasket(): number {
        return this.ProductArrayInBasket.length;
    }
    checkProductInBasketById(id: string): boolean {
        return this.ProductArrayInBasket.some(product => product.id === id);
    }
}