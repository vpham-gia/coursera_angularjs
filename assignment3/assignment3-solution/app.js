(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/");;

function FoundItemsDirective () {
  var ddo = {
    templateUrl: 'found-items.html',
    scope: {
      foundItemsList: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
};

function FoundItemsDirectiveController(){
  var list = this;

  list.noListToReturn = function(){
    if (list.foundItemsList.length === 0) {
      return true;
    }
    else {
      return false;
    }
  };
};

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController (MenuSearchService) {
  var ctrl = this;

  ctrl.searchTerm = '';
  ctrl.found = [];

  ctrl.updateListItem = function () {
    var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

    promise.then(function(response) {
      ctrl.found = response;
    })
  };

  ctrl.removeItem = function(index){
    ctrl.found.splice(index, 1);
  };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService ($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var response = $http({
      method: 'GET',
      url: ApiBasePath + 'menu_items.json',
    })
    .then(function (result) {
      var items = result.data.menu_items;
      var foundItems = []

      for (var ind = 0; ind < items.length; ind++) {
        if (items[ind].description.indexOf(searchTerm) !== -1) {
          foundItems.push(items[ind])
        }
      }

      return foundItems;
    })

    return response;
  };
};
})();

// (function () {
// 'use strict';
//
// angular.module('ShoppingListCheckOff', [])
// .controller('ToBuyController', ToBuyController)
// .controller('AlreadyBoughtController', AlreadyBoughtController)
// .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
//
// ToBuyController.$inject = ['ShoppingListCheckOffService']
// function ToBuyController (ShoppingListCheckOffService) {
//   var toBuy = this;
//
//   toBuy.list = ShoppingListCheckOffService.getToBuyList();
//
//   toBuy.transferItem = function(item){
//     ShoppingListCheckOffService.transferItem(item)
//   };
//
//   toBuy.isEmpty = function(list){
//     return list.length;
//   };
// };
//
// AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
// function AlreadyBoughtController(ShoppingListCheckOffService) {
//   var alreadyBought = this;
//
//   alreadyBought.list = ShoppingListCheckOffService.getAlreadyBoughtList();
//
//   alreadyBought.isEmpty = function(list){
//     return list.length;
//   };
// };
//
// function ShoppingListCheckOffService() {
//   var service = this;
//
//   var toBuyList = [{ name: "Milk", quantity: "2" },
//                     { name: "Donuts", quantity: "200" },
//                     { name: "Cookies", quantity: "300" },
//                     { name: "Chocolate", quantity: "5" },
//                     { name: "Toto", quantity: "40" } ];
//   var alreadyBoughtList = [];
//
//   service.transferItem = function(index){
//     alreadyBoughtList.push(toBuyList[index])
//     toBuyList.splice(index, 1)
//   };
//
//   service.getToBuyList = function (){
//     return toBuyList;
//   };
//
//   service.getAlreadyBoughtList = function (){
//     return alreadyBoughtList;
//   };
// }
// })();
