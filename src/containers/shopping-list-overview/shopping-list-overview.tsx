import { Component } from '@stencil/core';

@Component({
  tag: 'shopping-list-overview',
  styleUrl: 'shopping-list-overview.component.scss'
})
export class ShoppingListOverview {
  render() {
    return (
      <div class="content">
        <div class="main">
          <item-filter></item-filter>
        </div>
      </div>
    );
  }
}
