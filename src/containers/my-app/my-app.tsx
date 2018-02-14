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
          <stencil-route-link url="/"  exact={true}>
            Main
          </stencil-route-link>
          <stencil-route-link url="/about"  exact={true}>
            About
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route
              url="/"
              component="demo-shopping-list-overview"
              exact={true}
            />
            <stencil-route
              url="/about"
              component="demo-about"
              exact={true}
            />
          </stencil-router>
        </main>
      </div>
    );
  }
}
