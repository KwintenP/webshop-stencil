import {Component, Listen, Prop, Watch} from '@stencil/core';
import { Item } from '../../entities/item.entity';

@Component({
  tag: 'demo-item-overview',
  styleUrl: './item-overview.scss'
})
export class ItemOverviewComponent {
  @Prop() items: Item[];

  render() {
    return (
      <span>
        <h3>Items found</h3>
        <div class="card-content">
          {this.items.map(item => <demo-card item={item} />)}
        </div>
      </span>
    );
  }
}
