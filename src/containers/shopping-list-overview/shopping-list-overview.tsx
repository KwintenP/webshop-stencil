import { Component, Listen, State } from '@stencil/core';
import { Item } from '../../entities/item.entity';
import 'rxjs/add/operator/map';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';

const API_KEY = 'sgkdpvaj88kj4z5m7k9r9rs2';

export const callWalmartApi = (term, page, priceFrom, priceTo) =>
  ajax({
    method: 'GET',
    url: `http://localhost:8080/api/search?query=${term}&start=${page * 10 +
      1}&format=json&facet=on&apiKey=${API_KEY}&facet.range=price:[${priceFrom} TO ${priceTo}]`
  });

//
// class BasketService {
//   basket$: Observable<Array<Item>>;
//
//   private items$ = new Subject<{ type: 'ADD' | 'REMOVE', value: Item, count?: number }>();
//
//   constructor() {
//     this.basket$ = this.items$
//       .scan<{ type: 'ADD' | 'REMOVE', value: Item, count?: number }, Array<Item>>(
//         (acc: Array<Item>, curr: { type: 'ADD' | 'REMOVE', value: Item, count?: number }) => {
//           switch (curr.type) {
//             case 'ADD':
//               const foundItem = acc.find(item => item.name === curr.value.name);
//               if (foundItem) {
//                 return acc.map(item => item.name === curr.value.name ? {
//                   ...item,
//                   count: item.count + curr.count
//                 } : item)
//                   .filter(item => item.count > 0);
//               } else {
//                 return [...acc, {...curr.value, count: 1}];
//               }
//             case 'REMOVE':
//               return acc.filter(item => item.name !== curr.value.name);
//           }
//         }, []);
//   }
//
//   addItem(item, count) {
//     this.items$.next({type: 'ADD', value: item, count});
//   }
//
//   removeItem(item) {
//     this.items$.next({type: 'REMOVE', value: item});
//   }
// }
//
// const basketService = new BasketService();

@Component({
  tag: 'shopping-list-overview',
  styleUrl: 'shopping-list-overview.component.scss'
})
export class ShoppingListOverview {
  @State() items: Item[] = [];
  @State() basket;

  constructor() {
    // basketService.basket$.subscribe(items => {
    //   console.log('b', items);
    //   this.basket = items;
    // });
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
    // basketService.addItem(e.detail, 1);
  }

  render() {
    return (
      <div class="content">
        <div class="main">
          <item-filter />
          {this.items}
          <item-overview items={this.items} />
        </div>
        <div class="main">
          <item-basket />
          <my-discounts></my-discounts>
        </div>
      </div>
    );
  }
}
