(function(app) {
	app.controller('EditController', ['$scope','$http','$stateParams','$state',function($scope,$http,$stateParams,$state){

		$scope.statesCompleted = ('Yes/No').split('/').map(function(state) {
			return {option: state};
		});

		$scope.consoles = ('Mega Drive/Nintendo Switch/Nintendo 64/Playstation 1/Playstation 2/' +
			'Playstation 3/Playstation 4/Super Nintendo/Xbox 360/'+
			'Xbox One').split('/').map(function(console) {
				return {name: console};
			});

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
			firebase.database().ref('/games/' +  $stateParams.id ).once('value').then(function(snapshot) {
				var arrayTemp = {
					id : snapshot.val().id,
					img : snapshot.val().img,
					title: snapshot.val().title,
					console: snapshot.val().console,
					year: parseInt(snapshot.val().year),
					completed: snapshot.val().completed,
					dateCompletion: new Date(snapshot.val().dateCompletion),
					notes: snapshot.val().notes
				};

				$scope.$apply(function () {
					$scope.game = arrayTemp;
				});
			});
			
			


			$scope.updateGame = function() {
				console.log("entrou");

				var gameData = {
					id : $stateParams.id,
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

				firebase.database().ref().update(updates);
				window.location = "http://localhost:3000/#!/";
			}

			$scope.cancelAction = function() {
				window.location.href = '#!/list';
			};


		}]);
})(gameListator);
