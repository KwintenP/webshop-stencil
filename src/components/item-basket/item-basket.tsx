import {Component, Event, EventEmitter, Prop} from '@stencil/core';
import {Item} from '../../entities/item.entity';

@Component({
  tag: 'demo-item-basket',
  styleUrl: './item-basket.scss'
})
export class ItemBasketComponent {
  @Prop() items: Item[];

  @Event() removeItem: EventEmitter<Item>;
  @Event() oneExtra: EventEmitter<Item>;
  @Event() oneLess: EventEmitter<Item>;

  removeItemTriggered(item: Item) {
    this.removeItem.emit(item);
  }

  oneExtraTriggered(item: Item) {
    this.oneExtra.emit(item);
  }

  oneLessTriggered(item: Item) {
    this.oneLess.emit(item);
  }

  render() {
    return (
      <span>
        <h3>Basket List</h3>
        {this.items}
        {this.items && this.items.length > 0 ? (
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Count</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.items.map(item =>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.salePrice}</td>
                  <td>{item.count}</td>
                  <td>
                    <i
                      class="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => this.removeItemTriggered(item)}
                    />
                    <i
                      class="fa fa-plus"
                      aria-hidden="true"
                      onClick={() => this.oneExtraTriggered(item)}
                    />
                    <i
                    class="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => this.oneLessTriggered(item)}
                  />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : null}
      </span>
    );
  }
}
