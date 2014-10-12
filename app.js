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


    $rootScope.createdItems = [
  //      {id: 0, name: 'item1', rank: "", attack: 15, defence: 25, equiped: false}
//        {id: 2, name: 'item2', rank: "", attack: 25, defence: 40, equiped: false}
    ];
    $rootScope.$on('createEvent', function (event, item) {
        $rootScope.createdItems.push(item);
    });

    $rootScope.equipItem = function (id) {
        $rootScope.createdItems[id].equiped = !$rootScope.createdItems[id].equiped;
        $rootScope.$broadcast('equipEvent', $rootScope.createdItems[id]);
    };

}]).controller('ItemCreateController', ['$scope', function ($scope) {


    $scope.names = ['レイピア', 'ロングソード', 'アーマー'];
    $scope.ranks = ['最低な', '臭い', '（無称号）', '名工の', '魔性の', '宿った', '伝説の', '恐ろしい', '壊れた'];
    $scope.itemParams = {'レイピア': {attack: 10, defence: 0}, 'ロングソード': {attack: 20, defence: 0}, 'アーマー': {attack: 0, defence: 10}};
    $scope.rankMulti = {'最低な': 0.5, '臭い': 0.8, '（無称号）': 1, '名工の': 1.33, '魔性の': 1.58, '宿った': 2.1, '伝説の': 2.75, '恐ろしい': 3.5, '壊れた': 5};

    $scope.id = 0;
    $scope.createItem = function (item) {
        //ここでitemを直接いじると次にフォームから来たものが共有されてしまう？]
        var newItem = {};
        newItem.id = $scope.id;
        newItem.name = item.name;
        newItem.rank = item.rank;
        newItem.attack = $scope.itemParams[item.name].attack * $scope.rankMulti[item.rank];
        newItem.defence = $scope.itemParams[item.name].defence * $scope.rankMulti[item.rank];
        newItem.equiped = false;
        $scope.id += 1;
        $scope.$emit('createEvent', newItem);
    };

}]);

