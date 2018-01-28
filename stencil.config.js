exports.config = {
  bundles: [
    {
      components: [
        'demo-app',
        'demo-shopping-list-overview',
        'demo-basket-overview',
        'demo-card',
        'demo-discounts',
        'demo-item-basket',
        'demo-item-filter',
        'demo-item-overview'
      ]
    },
    { components: ['demo-about'] }
  ],
  collections: [{ name: '@stencil/router' }],
  globalScript: 'src/services/basket.service.ts'
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
