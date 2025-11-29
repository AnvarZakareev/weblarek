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
import { EventEmitter, IEvents } from './components/base/Events'
import { CardPreview } from './components/views/card/CardPreview';
import { cloneTemplate } from './utils/utils';
import { categoryMap } from './utils/constants';
import { Modal } from './components/views/Modal';
import { Header } from './components/views/Header';
import { Basket } from './components/views/Busket';
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
      onClick: () => events.emit('card:select', item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards })
});

// вызов загрузки карточек в галлерею
events.emit('catalog:changed', {})

// клик по карточке товара в галерее
events.on('card:select', (item) => {
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate), events)
  modal.render({ content: cardPreview.render(item) });
  modalTemplate.style.display = 'block'
})

// клик по кнопке 'крестику' в модальном окне
events.on('modal:close',  () => {
  modalTemplate.style.display = 'none'
});

// клик по кнопке 'в корзину' в окне превью
events.on('basket:add', (card) => {
  console.log('basket:add')
  modalTemplate.style.display = 'none'
  console.log(card)
  // basketModel.addProductInBasket(card)
  // basketModel.addProductInBasket = {...card};
});



















// клик по кнопке 'корзину' в шапке
events.on('basket:open',  () => {
  // const cardInBusket = 
  // modalTemplate.style.display = 'none'
  console.log('basket:open')
});


//     +| "catalog:changed"        // вызов загрузки карточек в галлерею
//     | "selectedCard:changed"   // 
//     +| "card:select"            // клик по карточке товара в галерее
//     +| "basket:open"            // клик по кнопке 'корзину' в шапке
//     +| "basket:add"             // клик по кнопке 'в корзину' в окне превью
//     | "basket:remove"          // удальть товар с корзины
//     | "basket:changed"         // 
//     | "basket:clear"           // корзина отчистить
//     | "form:changed"           // форма изменить
//     | "buyer:changed"          // покупатель изменить
//     | "order:start"            // заказ начало
//     | "order:next"             // заказ второй
//     | "order:post"             // заказ последний
//     | "order:complete"         // заказ завершить
//     | "modalState:changed"     // 
//     +| "modal:close";           // закрыть модальное окно