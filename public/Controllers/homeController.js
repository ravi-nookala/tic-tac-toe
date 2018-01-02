 var app = angular.module('gameApp');
 app.controller('homeCtrl', function($scope,$firebase,$location,$window) {
  var ref = new Firebase("https://tictactoe-ea104.firebaseio.com/game");  
      var fb = $firebase(ref);
        var syncObject = fb.$asObject();
  
  syncObject.$bindTo($scope, 'days');
  $scope.existing = false;
  // $scope.gameUrl = "sai";
  $scope.newGame = function(){

  var num = Math.floor(100000 + Math.random() * 900000);
  var x = 0;
 //   ref.child(num).set({
  //        board : [
 //    [ { value: '-' }, { value: '-' }, { value: '-' } ],
 //    [ { value: '-' }, { value: '-' }, { value: '-' } ],
 //    [ { value: '-' }, { value: '-' }, { value: '-' } ]
 //  ]
  // });
  var obj = {};
  obj[num] = {board : [
    [ { value: '-' }, { value: '-' }, { value: '-' } ],
    [ { value: '-' }, { value: '-' }, { value: '-' } ],
    [ { value: '-' }, { value: '-' }, { value: '-' } ]
  ],currentPlayer:'X',winner:'none'};
  fb.$set(obj);    

  $location.path('/game/'+ num);
  }

$scope.existingGame = function(){
  $scope.existing = true;
}
$scope.redirectGame = function(gameUrl){
$window.location.href = gameUrl;
}
});