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
  tag: 'shopping-list-overview',
  styleUrl: 'shopping-list-overview.component.scss'
})
export class ShoppingListOverview {
  @State() items: Item[] = [];
  @State() basketItems: Item[];
  @State() totalPrice: number;
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
  }

  @Listen('oneExtra')
  addCountToElement(event: CustomEvent) {
    event.stopPropagation();
    this.basketService.addItem(event.detail, 1);
  }

  @Listen('oneLess')
  substractCountFromElement(event: CustomEvent) {
    event.stopPropagation();
    this.basketService.addItem(event.detail, -1);
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
  }

  @Listen('discountChange')
  discountCodeChange(event: CustomEvent) {

    calculations();
  }

  calculations() {
    this.calculatePrice();
    this.calculateNumberOfElements();
  }

  calculatePrice() {
    this.totalPrice = this.basketItems.reduce<number>((acc: number, curr) => acc + curr.count * curr.salePrice, 0);
  }

  calculateNumberOfElements() {
    this.nrOfElements = this.basketItems.reduce<number>((acc: number, curr) => acc + curr.count, 0);
  }

  render() {
    console.log('rendered');
    return (
      <div class="page">
        <item-filter/>
        <div class="content">
          <div class="main">
            <item-overview items={this.items}/>
          </div>
          <div class="main">
            <item-basket items={this.basketItems}></item-basket>
            <my-discounts/>
            <basket-overview nrOfElements={this.nrOfElements}
                             totalPrice={this.totalPrice}/>
          </div>
        </div>
      </div>
    );
  }
}
