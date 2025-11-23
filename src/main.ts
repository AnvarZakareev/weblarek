// #region import
import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { ProductCatalogModel } from './components/models/ProductCatalog';
import { BasketModel } from './components/models/Basket';
import { BuyerModel } from './components/models/Buyer';
import { TPayment } from './types/index'
import { CompositionAPI } from './components/base/CompositionApi';
import { Api } from './components/base/Api';
import { API_URL_WORKS } from './utils/constants'
import { Gallery } from './components/views/Gallary';
import { Card } from './components/views/card/Card';
import { CardCatalog } from './components/views/card/CardCatalog';
import { EventEmitter } from './components/base/Events'
import { CardPreview } from './components/views/card/CardPreview';
import { cloneTemplate } from './utils/utils';
import { categoryMap } from './utils/constants';
import { Modal } from './components/views/Modal';
// #endregion

// #region const
const events = new EventEmitter();

const cardPreview = document.getElementById('card-preview') as HTMLTemplateElement;

const catalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const gallerya = document.getElementById('gallery') as HTMLElement;

const gallery = new Gallery(gallerya);

const productsModel = new ProductCatalogModel();
// #endregion

//#region test ProductCatalog

// // сохранение массива товаров полученного в параметрах метода
productsModel.setItems(apiProducts.items);
// console.log(`Массив товаров из каталога: `, productsModel.getItems());
// let test1 = productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
// console.log(`получение одного товара по его id`, productsModel.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390"))
// if (test1) {
//   console.log(`сохранение товара для подробного отображения`, productsModel.saveProductSelected(test1))
//   console.log(`получение товара для подробного отображения: `, productsModel.getProductSelected());
// } 
// console.log(`получение товара для подробного отображения: `, productsModel.getProductSelected());
//#endregion

//#region test Basket

// const basketModel = new Basket()
// // получение массива товаров, которые находятся в корзине
// console.log('получение массива товаров, которые находятся в корзине', basketModel)
// // очистка корзины
// basketModel.clearBasket()
// // добавление товара, который был получен в параметре, в массив корзины;
// basketModel.addProductInBasket(apiProducts.items[0])
// basketModel.addProductInBasket(apiProducts.items[1])
// // удаление товара, полученного в параметре из массива корзины
// // console.log(basketModel.delProductInBasket(test1))
// console.log('получение массива товаров, которые находятся в корзине', basketModel)
// // получение стоимости всех товаров в корзине
// console.log('получение стоимости всех товаров в корзине', basketModel.getTotalPrice())
// // получение количества товаров в корзине
// console.log('получение количества товаров в корзине', basketModel.getLengthProductInBasket())
// // проверка наличия товара в корзине по его id, полученного в параметр метода
// console.log('проверка наличия товара в корзине по его id, полученного в параметр метода', basketModel.checkProductInBasketById("b06cde61-912f-4663-9751-09956c0eed67"))

//#endregion

//#region test Buyer

// const cardPay: TPayment = 'card';

// const bayerCorrectModal = new Buyer({
//   payment: cardPay,
//   email: 'no@mail.ru',
//   phone: '8950',
//   address: 'far far away'
// });

// const bayerIncorrectModal = new Buyer({
//   payment: '',
//   email: '',
//   phone: '',
//   address: ''
// });

// // получение всех данных покупателя
// console.log(`получение всех данных покупателя`, bayerCorrectModal.getBuyerData())
// // сохранение данных в модели
// bayerCorrectModal.saveBuyerData('phone', '999999999999999999999999')
// // очистка данных покупателя
// bayerCorrectModal.clearBuyerData()
// // валидация данных
// console.log(`валидация данных`, bayerIncorrectModal.validBuyerData())
//#endregion

//#region test CompositionAPI

// async function main() {
//   const apiInstance = new Api(API_URL_WORKS);
//   // console.log(apiInstance)
//   const catalog = new CompositionAPI(apiInstance);
  
//   try {
//     // Получение каталога товаров
//     const productList = await catalog.fetchProducts();
// //     // Сохранение товаров
//     productsModel.setItems(productList.items)
//     console.log(`Наконец то получили массив товаров от сервера`, productsModel)
    
//   } catch (error) {
// //     console.error('Ошибка при загрузке каталога:', error);
//   }
// }

// main();

// async function sendOrderExample() {
  
//   const orderData = {
//     "items": [
//       "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
//       "854cef69-976d-4c2a-a18c-2aa45046c390",
//       "412bcf81-7e75-4e70-bdb9-d3c73c9803b7"
//     ],
//     "total": 4700,
//     "payment": "card" as TPayment,
//     "phone": "1",
//     "email": "1",
//     "address": "1"
//   };
  
//   const apiInstance = new Api(API_URL_WORKS);
//   const catalog = new CompositionAPI(apiInstance);
  
//   try {
//     const response = await catalog.sendOrder(orderData);
//     console.log('Ответ сервера после отправки заказа:', response);
//   } catch (error) {
//     console.error('Ошибка при отправке заказа:', error);
//   }
// }

// sendOrderExample();
//#endregion

// #region test CardCatalog
const arr = productsModel.productArray;

const arrayCard: HTMLElement[] = [];

arr.forEach(card => {
  const newCardClone = catalogTemplate.content.cloneNode(true) as DocumentFragment;
  const newcardElement = newCardClone.firstElementChild as HTMLElement;

  const newCard = new CardCatalog(newcardElement, {
    onClick: () => {
      // console.log('test click');
      events.emit('catalog:changed', {card});
    }
  });
  
  newCard.category = card.category;
  newCard.image = 'src/images/logo.svg';
  newCard.title = card.title;
  newCard.price = card.price as number;

  const element = newCard.render() as HTMLElement;

  arrayCard.push(element);
});

gallery.catalog = arrayCard;
// gallery.catalog = arrayCard;

// #endregion

// #region test CardPreview

const cardPreviewClone = cardPreview.content.cloneNode(true) as DocumentFragment;
const cardPreviewElement = cardPreviewClone.firstElementChild as HTMLElement;
// const modal = new Modal(events, cardPreview);

const cardPre = new CardPreview(cardPreviewElement, events)

// Показываем модальное окно
function showModal() {
  cardPreview.style.display = 'flex'; // или 'flex'
}

// Скрываем модальное окно
function hideModal() {
  cardPreview.style.display = 'none';
}

// Подписка на события
events.on('catalog:changed', () => {
  // console.log('test ok')
  console.log(cardPre)

  showModal();
});

events.on('closeModal', () => {
  hideModal();
});

// const select = new EventEmitter();

// select.on('selectedCard:changed', (data) =>{
//   console.log(`selectedCard`, data)
// });

// const cardPre = new CardPreview(cardPreviewElement, select
// )

// cardPre.category = 'софт-скил'; 
// cardPre.image = "src/images/logo.svg"; 
// cardPre.description = '+1 час в сутках';
// #endregion
// console.log(productsModel)

// const events = new EventEmitter();

// events.on('catalog:changed', () => {
//   const itemCards = productsModel.getItems().map((item) => {
//     const card = new CardCatalog(cloneTemplate(catalogTemplate), {
//       onClick: () => events.emit('card:select', item),
//     });
//     return card.render(item);
//   });
  
//   gallery.render({ catalog: itemCards })
// });

