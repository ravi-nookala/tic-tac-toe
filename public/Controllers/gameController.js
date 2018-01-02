var app = angular.module('gameApp');
 app.controller('gameCtrl', function($scope,$firebase,$location,$routeParams) {
 	var ref = new Firebase("https://tictactoe-ea104.firebaseio.com/game");  
  		var fb = $firebase(ref);
  		  $scope.syncObject = fb.$asObject();
  		    $scope.syncObject.$bindTo($scope, 'days');
  		  $scope.gameId = $routeParams.param;

  		  	
  	$scope.currentPlayer;
  	 $scope.win;
  	ref.on("value", function(snapshot) {
	  var changedPost = snapshot.val();
	  $scope.currentPlayer = changedPost[$scope.gameId].currentPlayer;
	  // $scope.win = changedPost[$scope.gameId].winner;
	});

	ref.on("child_changed", function(snapshot) {
	  var champ = snapshot.val();
	   $scope.win = champ.winner;
	});
	
  $scope.isTaken = function(cell) {
    return cell.value !== '-';
  };
  
  
  
  
  $scope.move = function(cell,row,index) {
  	var changePlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
  	var currentBoard =  $scope.syncObject[$scope.gameId].board;
  	currentBoard[row][index].value = $scope.currentPlayer;
  	var hopperRef = ref.child($scope.gameId);
	hopperRef.update({
	  "board": currentBoard,
	  "currentPlayer": changePlayer
	});
	// $scope.syncObject[$scope.gameId].board.length = 0;
	// ref.on("child_changed", function(snapshot) {
	//   var changedPost = snapshot.val();
	//   // console.log(snapshot.val(),"****************");
	// });
    if (checkForEndOfGame() === "none") {
    	var a = $scope.syncObject[$scope.gameId].board;
    	var arrfull = [];
		for(var i=0;i<3;i++){
			for(var j=0;j<3;j++){
				if(a[i][j].value === '-'){
					break;
				}else{
					arrfull.push(a[i][j].value);
				}


			}

			// if(arrfull.length < 9){
			// 	break;
			// }
		}

		if(arrfull.length == 9){
					var champ = "Draw";
					var winRef = ref.child($scope.gameId);
					winRef.update({
						"winner":champ
					});
				}    	
    }
  };


  var checkForEndOfGame = function() {
 	var ref1 = new Firebase("https://tictactoe-ea104.firebaseio.com/game");
 	var oldBoard;
	// Attach an asynchronous callback to read the data at our posts reference
	ref1.on("value", function(snapshot) {
		oldBoard = snapshot.val();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	 	
	var a =  oldBoard[$scope.gameId].board;
	var matches = 1;
	//check the winner by evaluating who hit 3 in a line (vertical, horizontal, diagonal)
	//check horizontal
	//a. checking 1st array
	//b. checking 2nd array
	//c. checking 3rd array
	for (var i=0; i< 3;i++){
		for (var j=0; j<3;j++){
			
			if ((matches<=2)&& (j>0)){
				if ((a[i][j-1].value==a[i][j].value)&&(a[i][j-1].value!=="-")){
					matches=matches+1;
				}
			}
		}
		if (matches<3)
			matches=1;
		else{ 

			var champ = $scope.currentPlayer === 'X' ? 'O' : 'X';
			// $scope.win = champ;
			var winRef = ref.child($scope.gameId);
			winRef.update({
			  "winner":champ
			});
			
			// return $scope.win;                     
		}
	}

	//check vertical
	for (var i=0; i< 3;i++){
		for (var j=0; j<3;j++){
			if ((matches<=2)&& (j>0)){
				if ((a[j-1][i].value==a[j][i].value)&&(a[j-1][i].value !=="-")){
					matches=matches+1;
				}
			}
		}
		if (matches<3)
		matches=1;
		else
		{
			// var champ = $scope.currentPlayer === 'X' ? 'O' : 'X';
			// $scope.win = champ;
			// return $scope.win;  
			var champ = $scope.currentPlayer === 'X' ? 'O' : 'X';
			// $scope.win = champ;
			var winRef = ref.child($scope.gameId);
			winRef.update({
			  "winner":champ
			});             
			}
		}
	// //check diagonal
	var limit = 3;
	var x = 1;
	var y = 1;
	for (var i=0; i< 3;i++){
		if ((x<=2 || y<=2)&& (i>0)){
			if ((a[i-1][i-1].value==a[i][i].value)&&(a[i-1][i-1].value!=="-") ){
				x=x+1;
			}

			
			if((a[limit-1][i-1].value == a[limit-2][i].value) && (a[limit-1][i-1].value !== '-')){
				y++;
			}
			limit = limit - 1;
		}
			if(i==2){

				if(x == 3 || y == 3){
					var champ = $scope.currentPlayer === 'X' ? 'O' : 'X';
					
					var winRef = ref.child($scope.gameId);
					winRef.update({
					  "winner":champ
					});             
				}else{
					
					x =1;
					y=1;
				}
			// 	if (x<3 && y<3)
				
			// else{

			// // var champ = $scope.currentPlayer === 'X' ? 'O' : 'X';
			// // $scope.win = champ;
			// // return $scope.win;
			
			// 	}
			}
			
			
		}

 //    // TODO: check for a rowMatch, columnMatch, or diagonalMatch
    
 //    // $scope.winner = rowMatch || columnMatch || diagonalMatch;
    
 //    // TODO: if we don't have a winner, check for cat
    
     return $scope.win;
  };

  $scope.back = function(){
  	$location.path('/');
  }

});


 