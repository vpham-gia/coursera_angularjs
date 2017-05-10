(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService']
function ToBuyController (ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.list = ShoppingListCheckOffService.getToBuyList();

  toBuy.transferItem = function(item){
    ShoppingListCheckOffService.transferItem(item)
  };

  toBuy.isEmpty = function(list){
    return list.length;
  };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.list = ShoppingListCheckOffService.getAlreadyBoughtList();

  alreadyBought.isEmpty = function(list){
    return list.length;
  };
};

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyList = [{ name: "Milk", quantity: "2" },
                    { name: "Donuts", quantity: "200" },
                    { name: "Cookies", quantity: "300" },
                    { name: "Chocolate", quantity: "5" },
                    { name: "Toto", quantity: "40" } ];
  var alreadyBoughtList = [];

  service.transferItem = function(index){
    alreadyBoughtList.push(toBuyList[index])
    toBuyList.splice(index, 1)
  };

  service.getToBuyList = function (){
    return toBuyList;
  };

  service.getAlreadyBoughtList = function (){
    return alreadyBoughtList;
  };
}
})();

// (function () {
// 'use strict';
//
// angular.module('LunchCheck', [])
// .controller('LunchCheckController', LunchCheckController);
//
// LunchCheckController.$inject = ['$scope'];
// function LunchCheckController($scope) {
//   $scope.name = "";
//
//   $scope.checkNumber = function () {
//     var arrayOfStrings = $scope.name.split(',');
//
//     if ($scope.name == "") {
//       $scope.outputToDisplay = 'Please enter data first'
//     }
//     else if (arrayOfStrings.length <= 3) {
//       $scope.outputToDisplay = 'Enjoy!';
//     }
//     else {
//       $scope.outputToDisplay = 'Too much!';
//     }
//   };
// }
//
// })();
