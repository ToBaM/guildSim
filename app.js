/**
 * Created by Nad on 14/09/27.
 */
angular.module('App', []).controller('CharacterController', ['$scope', function ($scope) {
    $scope.nowClass;
    $scope.lastClass;

    $scope.attack = 10;
    $scope.defence = 20;

    $scope.$on('equipEvent', function (event, item) {
        if (item.equiped) {
            $scope.attack += item.attack;
            $scope.defence += item.defence;
        }
        else {
            $scope.attack -= item.attack;
            $scope.defence -= item.defence;
        }

    });

}]).controller('ItemController', ['$rootScope', function ($rootScope) {
    $rootScope.items = [
        {id: 1, name: 'item1', attack: 15, defence: 25, equiped: false},
        {id: 2, name: 'item2', attack: 25, defence: 40, equiped: false}
    ];

    $rootScope.addItem = function () {
    };

    $rootScope.equipItem = function (id) {
        $rootScope.items[id - 1].equiped = !$rootScope.items[id - 1].equiped;
        $rootScope.$broadcast('equipEvent', $rootScope.items[id - 1]);
    };
}]);