var gameListator = angular.module('gameListator', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router', 'firebase']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('edit', {
        url: '/edit/:id',
        templateUrl: 'partials/edit-partial.html',
        controller: 'EditController'
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