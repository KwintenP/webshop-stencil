import {Component, Listen, State} from '@stencil/core';
import { Item } from '../../entities/item.entity';
import 'rxjs/add/operator/map';
import {ajax} from 'rxjs/observable/dom/ajax';
const API_KEY = 'sgkdpvaj88kj4z5m7k9r9rs2';

export const callWalmartApi = (term, page, priceFrom, priceTo) =>
  ajax({
    method: 'GET',
    url: `http://localhost:8080/api/search?query=${term}&start=${page * 10 +
      1}&format=json&facet=on&apiKey=${API_KEY}&facet.range=price:[${priceFrom} TO ${priceTo}]`
  });

@Component({
  tag: 'shopping-list-overview',
  styleUrl: 'shopping-list-overview.component.scss'
})
export class ShoppingListOverview {
  @State()
  items: Item[] = [];

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

  render() {
    return (
      <div class="content">
        <div class="main">
          <item-filter />
          {this.items}
          <item-overview items={this.items} />
        </div>
      </div>
    );
  }
}
