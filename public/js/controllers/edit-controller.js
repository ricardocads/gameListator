(function(app) {
	app.controller('EditController', ['$scope','$http','$stateParams','$state',function($scope,$http,$stateParams,$state){

		$scope.game = {
			id : '',
			img : '',
			title: '',
			console: '',
			year: '',
			completed: '',
			dateCompletion: new Date(),
			notes: ""
		};


			var arrayTemp;
			return firebase.database().ref('/games/' +  $stateParams.id ).once('value').then(function(snapshot) {
				var arrayTemp = {
					id : snapshot.val().id,
					img : snapshot.val().img,
					title: snapshot.val().title,
					console: snapshot.val().console,
					year: parseInt(snapshot.val().year),
					completed: snapshot.val().completed,
					dateCompletion: snapshot.val().dateCompletion,
					notes: snapshot.val().notes
				};
			});

		$scope.$apply(function () {
			$scope.game = arrayTemp;
		});
			
			


		$scope.submit = function() {

			var gameData = {
				id : $scope.gameId,
				img : '',
				title: $scope.game.title,
				console: $scope.game.console,
				year: $scope.game.year,
				completed: $scope.game.completed,
				dateCompletion: ($scope.game.dateCompletion.getMonth() + 1) + '/' + $scope.game.dateCompletion.getDate() + '/' +  $scope.game.dateCompletion.getFullYear(),
				notes: $scope.game.notes
			};

			if (gameData.completed == "No") gameData.dateCompletion = '';

			var updates = {};
			updates['/games/' + gameData.id] = gameData;

			return firebase.database().ref().update(updates);
			window.location = "http://localhost:3000/#!/";
		}


	}]);
})(gameListator);
