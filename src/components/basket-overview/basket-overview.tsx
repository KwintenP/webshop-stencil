import { Component } from '@stencil/core';

@Component({
  tag: 'basket-overview',
  styleUrl: 'basket-overview.scss'
})
export class BasketOverviewComponent {
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
                placeholder="Total price"
              />
            </div>
          </div>
        </form>
      </span>
    );
  }
}
