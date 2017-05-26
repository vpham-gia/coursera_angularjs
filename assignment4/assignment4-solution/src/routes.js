(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
function RoutesConfig ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/1.home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/2.categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categ: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories()
              .then(function(response){
                      return response.data;
        });
      }]
    }
  })
  .state('items', {
    url: '/items',
    templateUrl: 'src/menuapp/templates/3.items.template.html',
    controller: 'ItemsController as itemCtrl',
    params: {
      param: null
    },
    resolve: {
      items: ['MenuDataService', '$stateParams',
              function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategories($stateParams.param)
                        .then(function(response){
                          return response.data.menu_items;
                        })
              }]
    }
  });

}

})();
