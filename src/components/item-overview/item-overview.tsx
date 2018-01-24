import {Component, Listen, Prop, Watch} from '@stencil/core';
import { Item } from '../../entities/item.entity';

@Component({
  tag: 'item-overview',
  styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
  @Prop() items: Item[];

  @Listen('elementAdd')
  elementAddTriggered(item: Item) {
    console.log('item', item);
  }

  render() {
    return (
      <span>
        <h3>Items found</h3>
        <div class="card-content">
          {this.items.map(item => <my-card item={item} />)}
        </div>
      </span>
    );
  }
}
