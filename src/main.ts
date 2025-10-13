import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { ProductCatalog } from './components/models/ProductCatalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { TPayment } from './types/index'
import { CompositionAPI } from './components/base/CompositionApi';
import { Api } from './components/base/Api';
import { API_URL, API_URL_WORKS } from './utils/constants'

//#region test ProductCatalog

const productsModel = new ProductCatalog();
// сохранение массива товаров полученного в параметрах метода
productsModel.setItems(apiProducts.items);
console.log(`Массив товаров из каталога: `, productsModel.getItems());
let test1 = productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log(`получение одного товара по его id`, productsModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"))
if (test1) {
  console.log(`сохранение товара для подробного отображения`, productsModel.saveProductSelected(test1))
  console.log(`получение товара для подробного отображения: `, productsModel.getProductSelected());
} 
console.log(`получение товара для подробного отображения: `, productsModel.getProductSelected());
//#endregion

//#region test Basket

const basketModel = new Basket()
// получение массива товаров, которые находятся в корзине
console.log('получение массива товаров, которые находятся в корзине', basketModel)
// очистка корзины
basketModel.clearBasket()
// добавление товара, который был получен в параметре, в массив корзины;
basketModel.addProductInBasket(apiProducts.items[0])
basketModel.addProductInBasket(apiProducts.items[1])
// удаление товара, полученного в параметре из массива корзины
// console.log(basketModel.delProductInBasket(test1))
console.log('получение массива товаров, которые находятся в корзине', basketModel)
// получение стоимости всех товаров в корзине
console.log('получение стоимости всех товаров в корзине', basketModel.getTotalPrice())
// получение количества товаров в корзине
console.log('получение количества товаров в корзине', basketModel.getLengthProductInBasket())
// проверка наличия товара в корзине по его id, полученного в параметр метода
console.log('проверка наличия товара в корзине по его id, полученного в параметр метода', basketModel.checkProductInBasketById("b06cde61-912f-4663-9751-09956c0eed67"))
//#endregion

//#region test Buyer

const cardPay: TPayment = 'card';

const bayerCorrectModal = new Buyer({
  payment: cardPay,
  email: 'no@mail.ru',
  phone: '8950',
  address: 'far far away'
});

const bayerIncorrectModal = new Buyer({
  payment: '',
  email: '',
  phone: '',
  address: ''
});

// получение всех данных покупателя
console.log(`получение всех данных покупателя`, bayerCorrectModal.getBuyerData())
// сохранение данных в модели
bayerCorrectModal.saveBuyerData('phone', '999999999999999999999999')
// очистка данных покупателя
bayerCorrectModal.clearBuyerData()
// валидация данных
console.log(`валидация данных`, bayerIncorrectModal.validBuyerData())
//#endregion

//#region test CompositionAPI

async function main() {
  const apiInstance = new Api(API_URL_WORKS);
  console.log(apiInstance)
  const catalog = new CompositionAPI(apiInstance);
  
  try {
    // Получение каталога товаров
    const productList = await catalog.fetchProducts();
    // Сохранение товаров
    productsModel.setItems(productList.items)
    console.log(`Наконец то получили массив товаров от сервера`, productsModel)
    
  } catch (error) {
    console.error('Ошибка при загрузке каталога:', error);
  }
}

main();
//#endregion