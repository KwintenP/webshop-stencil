exports.config = {
  bundles: [
    { components: ['my-app', 'item-filter', 'shopping-list-overview', 'my-card', 'item-overview'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
