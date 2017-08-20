var gameListator = angular.module('gameListator', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router', 'firebase']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('edit/:id', {
        url: '/edit/',
        templateUrl: 'partials/edit-partial.html',
        controller: 'editController'
    })

    .state('list', {
            url: '/',
            templateUrl: 'partials/list-partial.html',
            controller: 'ListController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partials/about-partial.html',
            controller: 'AboutController'
        });
    }]);

})(gameListator);