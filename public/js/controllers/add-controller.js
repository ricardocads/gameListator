(function(app) {
	app.controller('AddController', ['$scope', function($scope) {
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
		$scope.statesCompleted = ('Yes/No').split('/').map(function(state) {
			return {option: state};
		});

		$scope.consoles = ('Mega Drive/Nintendo Switch/Nintendo 64/Playstation 1/Playstation 2/' +
			'Playstation 3/Playstation 4/Super Nintendo/Xbox 360/'+
			'Xbox One').split('/').map(function(console) {
				return {name: console};
			});

			$scope.cancelAction = function() {
				window.location.href = '#!/list';
			};

			$scope.submit = function() {

				var gameData = {
					id : '',
					img : '',
					title: $scope.game.title,
					console: $scope.game.console,
					year: $scope.game.year,
					completed: $scope.game.completed,
					dateCompletion: ($scope.game.dateCompletion.getMonth() + 1) + '/' + $scope.game.dateCompletion.getDate() + '/' +  $scope.game.dateCompletion.getFullYear(),
					notes: $scope.game.notes
				};

				if (gameData.completed == "No") gameData.dateCompletion = '';

				var newGameKey = firebase.database().ref().child('games').push().key;
				gameData.id = newGameKey;

				var updates = {};
				updates['/games/' + newGameKey] = gameData;

				firebase.database().ref().update(updates);
				window.location.href = '#!/list';
			};

		}]);
app.config(function($compileProvider) {
	$compileProvider.preAssignBindingsEnabled(true);
});
})(gameListator);

