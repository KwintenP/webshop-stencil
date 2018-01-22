import { Component } from '@stencil/core';
import { ajax } from 'rxjs/observable/dom/ajax';
import {AjaxRequest} from 'rxjs/Rx';
import {AUTH_BODY, AUTHORIZATION_HEADER, CONTENT_TYPE} from '../../configuration';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {
  componentDidLoad() {
    ajax({url: 'https://api.twitter.com/oauth2/token', headers: {Authorization: AUTHORIZATION_HEADER, 'Content-Type': CONTENT_TYPE}, body: AUTH_BODY})
      .subscribe(console.log);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starters</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route url="/" component="app-home" exact={true} />

            <stencil-route url="/profile/:name" component="app-profile" />
          </stencil-router>
        </main>
      </div>
    );
  }
}
