// #region import
import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { ProductCatalogModel } from './components/models/ProductCatalog';
import { BasketModel } from './components/models/Basket';
import { ensureElement } from "../src/utils/utils";
import { IBuyer, IProduct } from './types/index'
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
import { Forms } from './components/views/form/Forms';
// #endregion

// #region const

const events = new EventEmitter();

const productsModel = new ProductCatalogModel();

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

//#endregion

// #region start

// ----------------------------------- to do -----------------------------------
// после интеграции с АПИ изменить на, данные с сервера
// массив карточек с модели данных
productsModel.setItems(apiProducts.items);

// счетчик корзины
header.counter = basketModel.getLengthProductInBasket();

const container: HTMLElement = basket.render();
const buttonContayner = ensureElement<HTMLButtonElement>('.button', container);
//по умолчанию кнопка 'Оформить' недоступна
buttonContayner.disabled = true;

// #endregion

// загрузка карточек в галлерею
events.on('catalog:changed', () => {
  const itemCards = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(catalogTemplate), {
      onClick: () => events.emit('selectedCard:changed', item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards })
});

// ----------------------------------- to do -----------------------------------
// после интеграции с АПИ изменить на, реакцию после загрузки данных с сервера
// вызов загрузки карточек в галлерею
events.emit('catalog:changed', {})

              // -------------------
              // Функции помошники
              // -------------------

// проверка возможности купить
function canBuy(item: IProduct):boolean  {
  if (!item.price) {
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

              // -----------------
              // Реакция на клики
              // -----------------

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

// клик по кнопке 'крестику' в модальном окне
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
  const constants = new Order(cloneTemplate(orderTemplate), events);
  modal.render({ content: constants.render() });
  showModal();
});

              // --------------------
              // Реакция от моделей
              // --------------------

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

// товар удален из корзины
events.on('basket:remove', (item: IProduct) => {
  basketModel.delProductInBasket(item);
});

// function checkValid (data: { key: keyof IBuyer, value: string }) {
//   if (data.value === '' ) {
//     console.log('te')
//   }
//   else console.log('st')
// }

// изменения в форме

events.on('form:changed', (data: { key: keyof IBuyer, value: string }) => {
  console.log(data);
  if (bayer.validBuyerData()) {
    console.log('123')
  }
  bayer.saveBuyerData(data.key, data.value);
  // checkValid(data)
  // const errors = bayer.validBuyerData()
  //   console.log(Object.values(errors))

  // if (Object.keys(errors).length === 4) {
  //   console.log(1)
  // }
  // else {
  //   for (const x in errors) {
  //     if (errors.hasOwnProperty(x)) {
  //       console.log(2)
  //     }}
  //   }
  // // bayer.saveBuyerData(data.key, data.value);
});


// данные пользователя сохранены
events.on('buyer:changed', () => {
  console.log (bayer.getBuyerData());
  const bayerData = bayer.getBuyerData();
  console.log(bayerData?.address)
  console.log(bayerData?.email)
  console.log(bayerData?.payment)
});





// ----------------------------------- to do -----------------------------------
// для теста форм удалить до релиза
events.emit('order:start')


//     +| "catalog:changed"        // вызов загрузки карточек в галлерею
//     +| "selectedCard:changed"   // клик по карточке товара в галерее
//     +| "card:select"            // клик по кнопке 'в корзину' в окне превью
//     +| "basket:open"            // клик по кнопке 'корзину' в шапке
//     +| "basket:add"             // добавление в корзину
//     +| "basket:remove"          // удальть товар с корзины
//     +| "basket:changed"         // изменения в корзине
//     | "basket:clear"           // корзина отчистить
//     +| "form:changed"           // форма изменить
//     +| "buyer:changed"          // покупатель изменить
//     +| "order:start"            // заказ начало
//     | "order:next"             // заказ второй
//     | "order:post"             // заказ последний
//     +| "order:complete"         // заказ завершить
//     | "modalState:changed"     // 
//     +| "modal:close";           // закрыть модальное окно