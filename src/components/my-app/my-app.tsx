import { Component } from '@stencil/core';
import { ajax } from 'rxjs/observable/dom/ajax';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starters</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route url="/" component="shopping-list-overview" exact={true} />

            <stencil-route url="/about" component="about-webshop" />
          </stencil-router>
        </main>
      </div>
    );
  }
}
