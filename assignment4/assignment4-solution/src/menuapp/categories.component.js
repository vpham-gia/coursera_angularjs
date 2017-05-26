(function () {
'use strict';

angular.module('Data')
.component('categoriesComponent', {
  templateUrl: 'src/menuapp/templates/list-categories.template.html',
  bindings: {
    listCategories: '<'
  }
});

})();
