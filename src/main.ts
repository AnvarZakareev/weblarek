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
// #endregion

// #region const
const events = new EventEmitter();

// const modalContainer = document.getElementById('modal-container') as HTMLTemplateElement;

const previewTemplate = document.getElementById('card-preview') as HTMLTemplateElement;

const catalogTemplate = document.getElementById('card-catalog') as HTMLTemplateElement;

const galleryTemplate = document.getElementById('gallery') as HTMLElement;

const gallery = new Gallery(galleryTemplate);

const productsModel = new ProductCatalogModel();

const harder = document.getElementById('header') as HTMLElement;

const header = new Header()

productsModel.setItems(apiProducts.items);

const arrayCard2: HTMLElement[] = [];

const newCard = new CardCatalog(cloneTemplate(catalogTemplate), {
  onClick: () => {
    // console.log('test click');
    events.emit('catalog:changed', {});
  }
});

  newCard.category = 'другое';

  const element = newCard.render() as HTMLElement;

arrayCard2.push(element);

gallery.catalog = [...arrayCard2];
/** */

events.on('catalog:changed', () => {
  const itemCards = productsModel.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(catalogTemplate), {
      onClick: () => events.emit('card:select', item),
    });
    return card.render(item);
  });
    gallery.render({ catalog: itemCards })
});


events.on('card:select', (item) => {
  console.log(item);
  // const itemCards = productsModel.getItems().map((item) => {
  //   const previewCard = new CardPreview(cloneTemplate(previewTemplate), 
  // )})
})
