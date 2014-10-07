/**
 * Created by Nad on 14/09/27.
 */
angular.module('App', []).controller('CharacterController',['$scope',function($scope){
    $scope.nowClass;
    $scope.lastClass;

    $scope.attack=10;
    $scope.defence=20;
    $scope.items =[{name:'item1',attack:15,defence:25},{name:'item2',attack:25,defence:40}];

    $scope.addItem = function(){
    };

    $scope.addEquip = function(name){
        if(name=='item1'){
           $scope.attack += $scope.items[0].attack;
           $scope.defence += $scope.items[0].defence;
        }
        else if(name=='item2'){
            $scope.attack += $scope.items[1].attack;
            $scope.defence += $scope.items[1].defence;
        }
    };
}]);
