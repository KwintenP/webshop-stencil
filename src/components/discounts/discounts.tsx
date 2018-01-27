import { Component } from '@stencil/core';

@Component({
  tag: 'my-discounts',
  styleUrl: './discounts.scss'
})
export class DiscountsComponent {
  render() {
    return (
      <span>
        <form>
          <div class="form-check">
            <label class="form-check-label">
              <input type="checkbox" class="form-check-input" />
              VAT free
            </label>
          </div>
        </form>
        <form class=" form-inline">
          <div class=" form-group mx-sm-3">
            <label htmlfor="discountCode" class=" sr-only">
              Discount code
            </label>
            <input
              type=" text"
              class=" form-control"
              id=" discountCode"
              placeholder=" Discount code"
            />
          </div>
          <button type=" submit" class=" btn btn-primary">
            Update
          </button>
        </form>
      </span>
    );
  }
}
