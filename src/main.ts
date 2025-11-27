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

const galleryTemplate = document.getElementById('gallery') as HTMLElement;

// const headerTemplate = document.getElementById('header-container') as HTMLElement;

const modalTemplate = document.getElementById('modal-container') as HTMLElement;

const catalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;

// const header = new Header(events, headerTemplate)

const gallery = new Gallery(galleryTemplate);

const productsModel = new ProductCatalogModel();

const modal = new Modal(events, modalTemplate);

//#endregion

productsModel.setItems(apiProducts.items);

events.on('catalog:changed', () => {
  const itemCards = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(catalogTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards })
});

events.emit('catalog:changed', {})

events.on('card:select', (item) => {
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate), events)
  modal.render({ content: cardPreview.render(item) });
  modalTemplate.style.display = 'block'
})


events.on('modal:close',  () => {
  modalTemplate.style.display = 'none'
});