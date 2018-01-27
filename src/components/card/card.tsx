import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { Item } from '../../entities/item.entity';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';

@Component({
  tag: 'my-card',
  styleUrl: './card.scss'
})
export class CardComponent {
  @Prop() item: Item;
  @Event() elementAdd: EventEmitter<Item>;

  addElementClicked($event) {
    $event.preventDefault();
    this.elementAdd.emit(this.item);
  }

  render() {
    return (
      <div class="card">
        <img class="card-img-top" src={this.item.thumbnailImage} />
        <div class="card-body">
          <h4 class="card-title">{this.item.name}</h4>
          <p class="card-text">
            &euro;{this.item.salePrice} <br />
            {this.item.shortDescription}
          </p>
          <a class="btn btn-primary" onClick={e => this.addElementClicked(e)}>
            Add to cart
          </a>
        </div>
      </div>
    );
  }
}
