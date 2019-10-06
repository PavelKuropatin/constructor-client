export default function config($urlRouterProvider, $locationProvider, $translateProvider) {
    "use strict";

    $urlRouterProvider.otherwise('/');

    $translateProvider.useStaticFilesLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage("ru");
    $translateProvider.fallbackLanguage("en");

    // $locationProvider.html5Mode(true);
}