import {Component, EventEmitter, Prop} from '@stencil/core';

@Component({
  tag: 'basket-overview',
  styleUrl: 'basket-overview.scss'
})
export class BasketOverviewComponent {
  @Prop() nrOfElements: number;
  @Prop() totalPrice: number;

  render() {
    return (
      <span>
        <h3>Basket overview</h3>
        <form>
          <div class="form-group row">
            <label htmlfor="nrOfElements" class="col-sm- col-form-label">
              Number of elements
            </label>
            <div class="col-sm-6">
              <input
                readonly
                type="text"
                class="form-control-plaintext"
                id="nrOfElements"
                value={this.nrOfElements}
                placeholder="Number of elements"
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlfor="totalPrice" class="col-sm- col-form-label">
              Total price
            </label>
            <div class="col-sm-6">
              <input
                readonly
                type="text"
                class="form-control-plaintext"
                id="totalPrice"
                value={this.totalPrice}
                placeholder="Total price"
              />
            </div>
          </div>
        </form>
      </span>
    );
  }
}
