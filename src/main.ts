// #region import

import './scss/styles.scss';
import { ProductCatalogModel } from './components/models/ProductCatalog';
import { BasketModel } from './components/models/Basket';
import { ensureElement } from "../src/utils/utils";
import { IBuyer, IProduct, TPayment } from './types/index'
import { Gallery } from './components/views/Gallary';
import { CardCatalog } from './components/views/card/CardCatalog';
import { EventEmitter } from './components/base/Events'
import { CardPreview } from './components/views/card/CardPreview';
import { CardInBusket } from './components/views/card/CardBusket';
import { cloneTemplate } from './utils/utils';
import { Modal } from './components/views/Modal';
import { Header } from './components/views/Header';
import { Basket } from './components/views/Basket';
import { Order } from './components/views/form/Order';
import { BuyerModel } from './components/models/Buyer';
import { Contacts } from './components/views/form/Contacts';
import { OrderSuccess } from './components/views/OrderSuccess';
import { Api } from './components/base/Api';
import { CompositionAPI } from './components/base/CompositionApi';
import { API_URL } from '../src/utils/constants'
import { IBuyerExtended } from './types/index';
// #endregion

// #region const

const events = new EventEmitter();

const productsModel = new ProductCatalogModel(events);

const bayer = new BuyerModel(events);

const basketModel = new BasketModel(undefined, events);

const headerTemplate = document.getElementById('header-container') as HTMLTemplateElement;

const header = new Header(events, headerTemplate);

const galleryTemplate = document.getElementById('gallery') as HTMLTemplateElement;

const gallery = new Gallery(galleryTemplate);

const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;

const basket = new Basket(cloneTemplate(basketTemplate), events);

const modalTemplate = document.getElementById('modal-container') as HTMLElement;

const modal = new Modal(events, modalTemplate);

const catalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;

const inBusketTemplate = document.getElementById('card-basket') as HTMLTemplateElement;

const orderTemplate = document.getElementById('order') as HTMLTemplateElement;

const order = new Order(cloneTemplate(orderTemplate), events);

const contactsTemplate = document.getElementById('contacts') as HTMLTemplateElement;

const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

const successTemplate = document.getElementById('success') as HTMLTemplateElement;

const success = new OrderSuccess(cloneTemplate(successTemplate), events)

//#endregion

// #region async

async function main() {
  const apiInstance = new Api(API_URL);
  console.log(API_URL)
  
  const catalog = new CompositionAPI(apiInstance);
  
  try {
    const productList = await catalog.fetchProducts();
    productsModel.setItems(productList.items)
    // console.log('Запрос на сервер успешен:', productList)
  } 
  catch (error) {
    console.error('Ошибка при загрузке каталога:', error);
  }
}

main();

async function orderApi(basketData: IBuyerExtended) {
  const apiInstance = new Api(API_URL);
  
  const basket = new CompositionAPI(apiInstance);
  
  try {
    const bayer = await basket.sendOrder(basketData);
    console.log('Покупка успешна:', bayer)
  } 
  catch (error) {
    console.error('Ошибка при оформлении:', error);
  }
}

// счетчик корзины
header.counter = basketModel.getLengthProductInBasket();

// #endregion

//#region function

// проверка возможности купить
function canBuy(item: IProduct):boolean  {
  if(!item.price) {
    return true;
  }
  else return false;
};

// проверка на наличие товара в корзине
function isInBasket(item: IProduct):boolean {
  if (basketModel.checkProductInBasketById(item.id)) {
    return true;
  }
  else return false;
};

// изменение состояния кнопки в окне просмотра информации о товаре
// 'Недоступно', 'Купить', 'Удалить из корзины'
function buttonText(item: IProduct, cardPreview: CardPreview):void {
  const container: HTMLElement = cardPreview.render();
  const buttonContayner = ensureElement<HTMLButtonElement>('.button', container);
  if (canBuy(item)) {
    buttonContayner.textContent = 'Недоступно';
    buttonContayner.disabled = true;
  }
  else {
    if (isInBasket(item)) {
      buttonContayner.textContent = 'Удалить из корзины';
    } else if (!isInBasket(item)) {
      buttonContayner.textContent = 'Купить';
    }}
  };
  
// закрыть модальное окно
function closeModal() {
  modalTemplate.style.display = 'none';
};

// показать модальное окно
function showModal() {
  modalTemplate.style.display = 'block';
};

//#endregion

//#region click
 
// клик по кнопке 'корзина' в шапке
events.on('basket:open',  () => {
  modal.render({ content: basket.render()});
  showModal();
});

// клик по карточке товара в галерее
events.on('selectedCard:changed', (item: IProduct) => {
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate),  {
    onClick: () => events.emit('card:select', item),
  });
  buttonText(item, cardPreview);
  modal.render({ content: cardPreview.render(item) });
  showModal();
});

// клик по кнопке 'крестику' в модальном окне и вне окна
events.on('modal:close',  () => {
  closeModal();
});

// клик по кнопке 'Купить' в окне превью
events.on('card:select', (item: IProduct) => {
  if (!isInBasket(item)) {
    basketModel.addProductInBasket(item);
    closeModal();
  } else if (isInBasket(item)) {
    basketModel.delProductInBasket(item);
    closeModal();
  }
});

//клик по кнопке оформить в корзине
events.on('order:start', () => {
  closeModal();
  modal.render({ content: order.render() });
  showModal();
});

//#endregion

//#region model reaction

// загрузка карточек в галлерею
events.on('catalog:changed', () => {
  const itemCards = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(catalogTemplate), {
      onClick: () => events.emit('selectedCard:changed', item),
    });
    if(canBuy(item)) {
      item.price = 0;
    }
    return card.render(item);
  });
  gallery.render({ catalog: itemCards })
});

// товар удален из корзины
events.on('basket:remove', (item: IProduct) => {
  basketModel.delProductInBasket(item);
});

// корзина изменена
events.on('basket:changed', () => {
  const counter = basketModel.getLengthProductInBasket();
  header.render({ counter });
  const totalPrice = basketModel.getTotalPrice();
  const list = basketModel.getProductArrayInBasket().map((item, index) => {
    const cardItem = {
      title: item.title,
      price: item.price,
      item: index + 1,
    };

    const card = new CardInBusket(cloneTemplate(inBusketTemplate), {
      onClick: () => events.emit('basket:remove', item)
    });
    
    return card.render(cardItem);
  });
  const container: HTMLElement = basket.render();
  const buttonContayner = ensureElement<HTMLButtonElement>('.button', container);

  if (totalPrice == 0) {
    buttonContayner.disabled = true;
  }
  else if (totalPrice > 0) {
    buttonContayner.disabled = false;
  }
  basket.render({ cards: list, sum: totalPrice });

});

// форма изменена
events.on('form:changed', (data: { key: keyof IBuyer, value: string }) => {
  bayer.saveBuyerData(data.key, data.value);
})

// ----------------------------------- to do -----------------------------------
// слишком длинно
// данные пользователя изменены
events.on('buyer:changed', () => {
  const orderErrors: string[] = [];

  const paymentError = bayer.validBuyerData().payment;

  if (paymentError) {
    orderErrors.push(paymentError);
  }
  else {
    order.payment = bayer.getBuyerData()?.payment as TPayment
  }

  const addressError = bayer.validBuyerData().address;
  if (addressError) {
    orderErrors.push(addressError);
  }
  else {
    order.address = bayer.getBuyerData()?.address as TPayment
  }
  order.errors = orderErrors.join(' ');
  
  if (!orderErrors.length) {
    order.valid = false;
  }


  const contactsErrors: string[] = [];

  const emailError = bayer.validBuyerData().email;

  if (emailError) {
    contactsErrors.push(emailError);
  }
  else {
    contacts.email = bayer.getBuyerData()?.email as TPayment
  }

  const phoneError = bayer.validBuyerData().phone;
  if (phoneError) {
    contactsErrors.push(phoneError);
  }
  else {
    contacts.email = bayer.getBuyerData()?.phone as TPayment
  }
  contacts.errors = contactsErrors.join(' ');

  if (!contactsErrors.length) {
    contacts.valid = false;
  }
});

// заказ второй
events.on('order:submit', () => {
  closeModal();
  modal.render({ content: contacts.render() });
  showModal();
});

// заказ последний
events.on('contacts:submit', () => {
  const idArray: string[] = basketModel.getProductArrayInBasket().map(item => item.id)
  const totalPrice = basketModel.getTotalPrice();

  const basketData: IBuyerExtended = {
    items: idArray, 
    total: totalPrice, 
    payment: bayer.getBuyerData()?.payment as TPayment,
    email: bayer.getBuyerData()?.email as TPayment,
    phone: bayer.getBuyerData()?.phone as TPayment,
    address: bayer.getBuyerData()?.address as TPayment
  };
  
  orderApi(basketData)
  closeModal();
  // сброс всех данных
  success.message = basketModel.getTotalPrice();
  modal.render({ content: success.render() });
  basketModel.clearBasket();
  order.address = ''
  order.payment = ''
  contacts.email = ''
  contacts.phone = ''
  bayer.clearBuyerData();
  basket.cards = [];
  showModal();
});

// заказ завершить
events.on('order:complete', () => {
  closeModal();
})

//#endregion