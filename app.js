/**
 * Created by Nad on 14/09/27.
 */
angular.module('App', []).controller('CharacterController', ['$scope', function ($scope) {
    $scope.nowClass;
    $scope.lastClass;

    $scope.hitPoint = 0;
    $scope.attackTimes = 0;
    $scope.deadlyBlow = 0;
    $scope.attack = 0;
    $scope.accuracy = 0;
    $scope.defence = 0;
    $scope.avoid = 0;
    $scope.magicAttack = 0;
    $scope.magicHeal = 0;
    $scope.magicDefence = 0;

    $scope.$on('equipEvent', function (event, item) {
        $scope.calcEquip(item);
    });

    $scope.calcEquip = function (item) {
        if (item.equiped) {
            $scope.hitPoint += item.hitPoint;
            $scope.attackTimes += item.attackTimes;
            $scope.deadlyBlow += item.deadlyBlow;
            $scope.attack += item.attack;
            $scope.accuracy += item.accuracy;
            $scope.defence += item.defence;
            $scope.avoid += item.avoid;
            $scope.magicAttack += item.magicAttack;
            $scope.magicHeal += item.magicHeal;
            $scope.magicDefence += item.magicDefence;
        }
        else {
            $scope.hitPoint -= item.hitPoint;
            $scope.attackTimes -= item.attackTimes;
            $scope.deadlyBlow -= item.deadlyBlow;
            $scope.attack -= item.attack;
            $scope.accuracy -= item.accuracy;
            $scope.defence -= item.defence;
            $scope.avoid -= item.avoid;
            $scope.magicAttack -= item.magicAttack;
            $scope.magicHeal -= item.magicHeal;
            $scope.magicDefence -= item.magicDefence;
        }
    }

}]).controller('ItemController', ['$rootScope', function ($rootScope) {


    $rootScope.createdItems = [
        //      {id: 0, name: 'item1', rank: "", attack: 15, defence: 25, equiped: false}
    ];

    $rootScope.equipItem = function (id) {
        $rootScope.createdItems[id].equiped = !$rootScope.createdItems[id].equiped;
        $rootScope.$broadcast('equipEvent', $rootScope.createdItems[id]);
    };

    $rootScope.names = ['レイピア', 'ロングソード', 'アーマー'];
    $rootScope.ranks = ['最低な', '臭い', '（無称号）', '名工の', '魔性の', '宿った', '伝説の', '恐ろしい', '壊れた'];
    $rootScope.itemParams =
    {
        'レイピア': {hitPoint: 10, attackTimes: 0, deadlyBlow:0, attack:0, accuracy:0, defence:0, avoid:0, magicAttack:0, magicHeal:0, magicDefence:0},
        'ロングソード': {hitPoint: 10, attackTimes: 0, deadlyBlow:0, attack:0, accuracy:0, defence:0, avoid:0, magicAttack:0, magicHeal:0, magicDefence:0},
        'アーマー': {hitPoint: 10, attackTimes: 0, deadlyBlow:0, attack:0, accuracy:0, defence:0, avoid:0, magicAttack:0, magicHeal:0, magicDefence:0}
    };
    $rootScope.rankMulti = {'最低な': 0.5, '臭い': 0.8, '（無称号）': 1, '名工の': 1.33, '魔性の': 1.58, '宿った': 2.1, '伝説の': 2.75, '恐ろしい': 3.5, '壊れた': 5};

    $rootScope.id = 0;
    $rootScope.createItem = function (item) {
        //ここでitemを直接いじると次にフォームから来たものが共有されてしまう？
        var createdItem = $rootScope.calcItemStatus(item);
        $rootScope.createdItems.push(createdItem);
        $rootScope.id += 1;

    };
    $rootScope.calcItemStatus = function (item) {
        //TODO 小手の攻撃回数処理を実装
        var newItem = {};
        newItem.id = $rootScope.id;
        newItem.name = item.name;
        newItem.rank = item.rank;
        newItem.hitPoint = Math.floor($rootScope.itemParams[item.name].hitPoint * $rootScope.rankMulti[item.rank]);
        newItem.attackTimes = Math.floor($rootScope.itemParams[item.name].attackTimes);
        newItem.deadlyBlow = Math.floor($rootScope.itemParams[item.name].deadlyBlow);
        newItem.attack = Math.floor($rootScope.itemParams[item.name].attack * $rootScope.rankMulti[item.rank]);
        newItem.accuracy = Math.floor($rootScope.itemParams[item.name].accuracy * $rootScope.rankMulti[item.rank]);
        newItem.defence = Math.floor($rootScope.itemParams[item.name].defence * $rootScope.rankMulti[item.rank]);
        newItem.avoid = Math.floor($rootScope.itemParams[item.name].avoid * $rootScope.rankMulti[item.rank]);
        newItem.magicAttack = Math.floor($rootScope.itemParams[item.name].magicAttack * $rootScope.rankMulti[item.rank]);
        newItem.magicHeal = Math.floor($rootScope.itemParams[item.name].magicHeal * $rootScope.rankMulti[item.rank]);
        newItem.magicDefence = Math.floor($rootScope.itemParams[item.name].magicDefence * $rootScope.rankMulti[item.rank]);
        newItem.equiped = false;
        return newItem;
    }

}]);

