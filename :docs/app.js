(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.name = "";

  $scope.checkNumber = function () {
    var arrayOfStrings = $scope.name.split(',');

    if ($scope.name == "") {
      $scope.outputToDisplay = 'Please enter data first'
    }
    else if (arrayOfStrings.length <= 3) {
      $scope.outputToDisplay = 'Enjoy!';
    }
    else {
      $scope.outputToDisplay = 'Too much!';
    }
  };
}

})();
