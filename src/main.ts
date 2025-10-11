import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { ProductCatalog } from './components/base/models/ProductCatalog';
// import { Basket } from './components/base/models/Basket';
import { Buyer } from './components/base/models/Buyer';
import { TPayment } from './types/index'

// test ProductCatalog
const productsModel = new ProductCatalog();
// сохранение массива товаров полученного в параметрах метода
productsModel.setItems(apiProducts.items);
// console.log(`Массив товаров из каталога: `, productsModel.getItems());
// let test1 = productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
// let test2 = productsModel.getProductById("b06cde61-912f-4663-9751-09956c0eed67");
// let test3 = productsModel.getProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
// console.log(`получение одного товара по его id`, productsModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"))
// console.log(`сохранение товара для подробного отображения`, productsModel.saveProductSelected(test1))
// console.log(`получение товара для подробного отображения: `, productsModel.getProductSelected());

// // test Basket
// const basketModel = new Basket(productsModel.getItems())
// // получение массива товаров, которые находятся в корзине
// console.log('получение массива товаров, которые находятся в корзине', basketModel)
// // очистка корзины
// basketModel.clearBasket()
// // добавление товара, который был получен в параметре, в массив корзины;
// basketModel.addProductInBasket(apiProducts.items[0])
// basketModel.addProductInBasket(apiProducts.items[11])
// // удаление товара, полученного в параметре из массива корзины
// console.log(basketModel.delProductInBasket(test1))
// console.log('получение массива товаров, которые находятся в корзине', basketModel)
// // получение стоимости всех товаров в корзине
// console.log('получение стоимости всех товаров в корзине', basketModel.summProductInBasket())
// // получение количества товаров в корзине
// console.log('получение количества товаров в корзине', basketModel.getLengthProductInBasket())
// // проверка наличия товара в корзине по его id, полученного в параметр метода
// console.log('проверка наличия товара в корзине по его id, полученного в параметр метода', basketModel.checkProductInBasketById("b06cde61-912f-4663-9751-09956c0eed67"))

const cardPay: TPayment = 'card';

// test Buyer
const bayer = {
  payment: cardPay,
  email: 'ad@mai.op',
  phone: '000',
  address: 'far away'
}


const bayerCorrectModal = new Buyer({
  payment: 'card',
  email: 'no@mail.ru',
  phone: '8950',
  address: 'far far away'
});

const bayerIncorrectModal = new Buyer(bayer);

// получение всех данных покупателя
console.log(bayerCorrectModal.getBuyerData())
// сохранение данных в модели
bayerCorrectModal.saveBuyerData('phone', '999999999999999999999999')
console.log(bayerCorrectModal.getBuyerData())
// очистка данных покупателя
bayerCorrectModal.clearBuyerData()
console.log(bayerCorrectModal.getBuyerData())
// валидация данных
console.log(bayerCorrectModal.validBuyerData())
console.log(bayerIncorrectModal.validBuyerData())
