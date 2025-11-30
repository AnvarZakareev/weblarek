// #region import
import './scss/styles.scss';
import { apiProducts } from './utils/data'
import { ProductCatalogModel } from './components/models/ProductCatalog';
import { BasketModel } from './components/models/Basket';
import { ensureElement } from "../src/utils/utils";
import { BuyerModel } from './components/models/Buyer';
import { IProduct, TPayment } from './types/index'
import { CompositionAPI } from './components/base/CompositionApi';
import { Api } from './components/base/Api';
import { API_URL_WORKS } from './utils/constants'
import { Gallery } from './components/views/Gallary';
import { Card } from './components/views/card/Card';
import { CardCatalog } from './components/views/card/CardCatalog';
import { EventEmitter, IEvents } from './components/base/Events'
import { CardPreview } from './components/views/card/CardPreview';
import { cloneTemplate } from './utils/utils';
import { categoryMap } from './utils/constants';
import { Modal } from './components/views/Modal';
import { Header } from './components/views/Header';
import { Basket } from './components/views/Basket';
// #endregion

// #region const

const events = new EventEmitter();

const productsModel = new ProductCatalogModel();

const headerTemplate = document.getElementById('header-container') as HTMLTemplateElement;

const header = new Header(events, headerTemplate);

const basketModel = new BasketModel(undefined, events);

const galleryTemplate = document.getElementById('gallery') as HTMLTemplateElement;

const gallery = new Gallery(galleryTemplate);

const basketTemplate = document.getElementById('basket') as HTMLTemplateElement;

const basket = new Basket(events, cloneTemplate(basketTemplate));

const modalTemplate = document.getElementById('modal-container') as HTMLElement;

const modal = new Modal(events, modalTemplate);

const catalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;

//#endregion

// #region start

// ----------------------------------- to do -----------------------------------
// после интеграции с АПИ изменить на, данные с сервера
// массив карточек с модели данных
productsModel.setItems(apiProducts.items);

// счетчик корзины
header.counter = basketModel.getLengthProductInBasket();

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

// изменения счетчика товаров в корзине
function basketChanged ():void {
  header.counter = basketModel.getLengthProductInBasket();
}

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

// клик по кнопке 'корзину' в шапке
events.on('basket:open',  () => {
  // const cardInBusket = 
  // closeOpenModal();
  modal.render({ content: basket.render()});
  showModal();
  console.log('basket:open');
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

              // -----------------
              // Доклады корзины
              // -----------------

// товар добавлен в корзину
events.on('basket:add', () => {
  basketChanged();
});

// товар удален из корзины
events.on('basket:remove', () => {
  basketChanged();
});

// корзина отчищена
events.on('basket:clear', () => {
  basketChanged();
});






//     +| "catalog:changed"        // вызов загрузки карточек в галлерею
//     +| "selectedCard:changed"   // клик по карточке товара в галерее
//     +| "card:select"            // клик по кнопке 'в корзину' в окне превью
//     +| "basket:open"            // клик по кнопке 'корзину' в шапке
//     +| "basket:add"             // добавление в корзину
//     +| "basket:remove"          // удальть товар с корзины
//     | "basket:changed"         // изменения в корзине
//     +| "basket:clear"           // корзина отчистить
//     | "form:changed"           // форма изменить
//     | "buyer:changed"          // покупатель изменить
//     | "order:start"            // заказ начало
//     | "order:next"             // заказ второй
//     | "order:post"             // заказ последний
//     | "order:complete"         // заказ завершить
//     | "modalState:changed"     // 
//     +| "modal:close";           // закрыть модальное окно