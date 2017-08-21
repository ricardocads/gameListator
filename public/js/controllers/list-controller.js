(function(app) {
	app.controller('ListController', ['$scope', function($scope) {
	//----------VISUAL SEARCH BAR-------------

	var vm = this;

	var header = document.querySelector(".header");
	var input = document.querySelector(".search-box-input");
	var close = document.querySelector(".delete");

	function hideHeader() {
		header.classList.remove('show');
		header.classList.add('hide');
	};
	function showHeader() {
		if (input.value === '') {
			header.classList.remove('hide');
			header.classList.add('show');
		}
	};
	function showHeaderOnClose() {
		header.classList.remove('hide');
		header.classList.add('show');
	};

	input.addEventListener("focus", hideHeader);
	input.addEventListener("blur", showHeader);
	close.addEventListener("click", showHeaderOnClose);

	//----------VISUAL SEARCH BAR-------------

	//----------ENGINE SEARCH BAR-------------

	// $scope.searchWord = '';

	// $scope.filterGame = function(word,item) {

	// 	console.log(item);

	// 	 return function() {
	// 	 	if ( word == undefined || word.length == 0 || item.title == word ) return true;
 //         }
	// }

	$scope.customFilter = function (game) {
		return !$scope.search ||
			game.title === $scope.search ||
			game.console === $scope.search;
	}

	//----------ENGINE SEARCH BAR-------------

	//------------LISTING GAMES---------------

	$scope.todos = [];
	firebase.database().ref('/games/').orderByChild('dateCompletion').once('value').then(function(snapshot) {
		var arraytempReverse = [];
		snapshot.forEach(function(gameSnapshot) {
			var game = gameSnapshot.val();
			var temp = {
				id : game.id,
				img : game.img,
				title: game.title,
				console: game.console,
				year: game.year,
				yearsold: ((new Date()).getFullYear() - game.year),
				completed: game.completed,
				dateCompletion: game.dateCompletion,
				notes: game.notes
			};
			arraytempReverse.unshift(temp);
		});

		$scope.$apply(function () {
			$scope.todos = arraytempReverse;
		});
	});

	//------------LISTING GAMES---------------

	//-------------LIST ACTIONS---------------

	$scope.removeGame = function(name) {
		firebase.database().ref('/games/').child(name).remove();
		window.location.reload();
	}	

	$scope.editGame = function(name) {
		window.location.href = '#!/edit/'+name;
	}	

	//-------------LIST ACTIONS---------------
}]);


})(gameListator);