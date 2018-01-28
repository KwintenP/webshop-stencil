import { Component, Listen } from '@stencil/core';
import { ajax } from 'rxjs/observable/dom/ajax';
import { map } from 'rxjs/operators';


@Component({
  tag: 'demo-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  render() {
    return (
      <div>
        <header>
          <h1>StencilJS example webshop</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route
              url="/webshop"
              component="shopping-list-overview"
              exact={true}
            />
            <stencil-route url="/about" component="about-webshop" />
            <stencil-route url="/" exact={true}>
              <stencil-router-redirect url="/webshop" />
            </stencil-route>
          </stencil-router>
        </main>
      </div>
    );
  }
}
