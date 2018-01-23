import {Component} from '@stencil/core';

@Component({
  tag: 'about-webshop',
  styleUrl: './about.scss',
})
export class AboutComponent {
  render() {
    return (
      <div>Sample application created by <a href='https://twitter.com/kwintenp' target='_blank'>KwintenP</a> </div>
    );
  }
}
