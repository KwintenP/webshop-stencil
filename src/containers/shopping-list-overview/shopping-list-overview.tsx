import {Component, Listen, Prop, State} from '@stencil/core';
import {Item} from '../../entities/item.entity';
import 'rxjs/add/operator/map';
import {ajax} from 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/scan';
import {BasketService} from '../../services/basket.interface';

const API_KEY = 'sgkdpvaj88kj4z5m7k9r9rs2';

export const callWalmartApi = (term, page, priceFrom, priceTo) =>
  ajax({
    method: 'GET',
    url: `http://localhost:8081/api/search?query=${term}&start=${page * 10 +
    1}&format=json&facet=on&apiKey=${API_KEY}&facet.range=price:[${priceFrom} TO ${priceTo}]`
  });

@Component({
  tag: 'demo-shopping-list-overview',
  styleUrl: 'shopping-list-overview.component.scss'
})
export class ShoppingListOverview {
  @State() items: Item[] = [];
  @State() basketItems: Item[];
  @State() totalPrice: string;
  @State() nrOfElements: number;
  @Prop({context: 'basketService'}) basketService: BasketService;

  discounts = {
    vatFree: false,
    discountCode: 0,
  };

  constructor() {
  }

  componentDidLoad() {
    this.basketService.basket$.subscribe(
      (items) => this.basketItems = items
    );
  }

  @Listen('removeItem')
  removeItem(event: CustomEvent) {
    event.stopPropagation();
    this.basketService.removeItem(event.detail);
    this.calculations();
  }

  @Listen('oneExtra')
  addCountToElement(event: CustomEvent) {
    event.stopPropagation();
    this.basketService.addItem(event.detail, 1);
    this.calculations();
  }

  @Listen('oneLess')
  substractCountFromElement(event: CustomEvent) {
    event.stopPropagation();
    this.basketService.addItem(event.detail, -1);
    this.calculations();
  }

  @Listen('search')
  searchTriggered(search: CustomEvent) {
    callWalmartApi(
      search.detail.searchTerm,
      0,
      search.detail.priceFrom ? search.detail.priceFrom : 1,
      search.detail.priceTo ? search.detail.priceTo : 5000
    )
      .map(result => result.response.items)
      .subscribe(items => {
        this.items = items;
        console.log(this.items);
      });
  }

  @Listen('elementAdd')
  elementAddTriggered(e: CustomEvent) {
    this.basketService.addItem(e.detail, 1);
    this.calculations();
  }

  @Listen('discountChange')
  discountCodeChange(event: CustomEvent) {
    this.discounts = event.detail;
    console.log('event', event);
    console.log('event', event.detail);
    this.calculations();
  }

  calculations() {
    this.calculatePrice();
    this.calculateNumberOfElements();
  }

  calculatePrice() {
    let basketPrice = this.basketItems.reduce<number>((acc: number, curr) => acc + curr.count * curr.salePrice, 0);
    if (this.discounts.vatFree) {
      basketPrice = basketPrice / 1.21;
    }
    this.totalPrice = (basketPrice - this.discounts.discountCode).toFixed(2);
  }

  calculateNumberOfElements() {
    this.nrOfElements = this.basketItems.reduce<number>((acc: number, curr) => acc + curr.count, 0);
  }

  render() {
    console.log('rendered');
    return (
      <div class="page">
        <demo-item-filter/>
        <div class="content">
          <div class="main">
            <demo-item-overview items={this.items}/>
          </div>
          <div class="main">
            <demo-item-basket items={this.basketItems}/>
            <demo-discounts/>
            <demo-basket-overview nrOfElements={this.nrOfElements}
                                  totalPrice={this.totalPrice}/>
          </div>
        </div>
      </div>
    );
  }
}
