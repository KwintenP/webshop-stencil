import {Component, Event, EventEmitter, State} from '@stencil/core';

@Component({
  tag: 'item-filter',
  styleUrl: './item-filter.scss'
})
export class ItemFilterComponent {
  @Event() search: EventEmitter<{searchTerm: string, priceFrom: number, priceTo: number}>;

  @State()
  formValue = {
    searchTerm: '',
    priceFrom: 0,
    priceTo: 5000,
  };

  updateFormValue(e) {
    this.formValue = {...this.formValue, [e.target.name]: e.target.value};
  }

    submit(e) {
    e.preventDefault();
    this.search.emit(this.formValue);
  }

  render() {
    return (
      <span>
        <h3>Search for elements</h3>
        <form onSubmit={(e) => this.submit(e)}>
          <div class="form-group row">
            <label htmlFor="searchTerm" class="col-sm- col-form-label">
              Search term
            </label>
            <div class="col-sm-6">
              <input
                type="text"
                class="form-control"
                id="searchTerm"
                name="searchTerm"
                value={this.formValue.searchTerm}
                onInput={(e) => this.updateFormValue(e)}
                placeholder="Enter a search term"
              />
            </div>
          </div>
          <div class="form-group row">
            <label htmlfor="priceFrom" class="col-sm- col-form-label">
              Price from
            </label>
            <div class="col-sm-4">
              <input
                min="1"
                max="5000"
                type="range"
                name="priceFrom"
                class="form-control"
                id="priceFrom"
                value={this.formValue.priceFrom}
                onInput={(e) => this.updateFormValue(e)}
              />
            </div>
            <div class="col-sm-2">
              {this.formValue.priceFrom}
            </div>
          </div>
          <div class="form-group row">
            <label htmlfor="priceTo" class="col-sm- col-form-label">
              Price to
            </label>
            <div class="col-sm-4">
              <input
                min="1"
                max="5000"
                type="range"
                class="form-control"
                name="priceTo"
                id="priceTo"
                value={this.formValue.priceTo}
                onInput={(e) => this.updateFormValue(e)}
              />
            </div>
            <div class="col-sm-2">
              {this.formValue.priceTo}
            </div>
          </div>
          <button type="submit">Search</button>
        </form>
      </span>
    );
  }
}
