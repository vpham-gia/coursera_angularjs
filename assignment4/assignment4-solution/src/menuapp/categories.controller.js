(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['categ']
function CategoriesController (categ) {
  var catCtrl = this;

  catCtrl.categories = categ;
};

})();
