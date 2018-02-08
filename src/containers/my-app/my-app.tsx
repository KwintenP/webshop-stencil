import { Component, Listen } from '@stencil/core';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/operators';


@Component({
  tag: 'demo-app',
  styleUrl: 'my-app.scss'
})
export class DemoApp {
  render() {
    return (
      <div>
        <header>
          <h1>StencilJS example webshop</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route
              url="/"
              component="demo-shopping-list-overview"
              exact={true}
            />
          </stencil-router>
        </main>
      </div>
    );
  }
}
