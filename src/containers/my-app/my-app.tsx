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
          <a class="menu" href="/">Main</a>
          <a class="menu" href="/about">About</a>
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
