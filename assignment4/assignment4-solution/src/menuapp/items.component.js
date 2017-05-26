(function () {
'use strict';

angular.module('Data')
.component('itemsComponent', {
  templateUrl: 'src/menuapp/templates/list-items.template.html',
  bindings: {
    listItems: '<'
  }
});

})();
