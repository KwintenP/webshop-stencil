exports.config = {
  bundles: [
    { components: ['my-app', 'item-filter', 'shopping-list-overview'] }
  ],
  collections: [
    { name: '@stencil/router' }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
