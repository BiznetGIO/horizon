(function(){'use strict';angular.module('horizon.auth.login',[],config);config.$inject=['$provide','$windowProvider'];function config($provide,$windowProvider){var path=$windowProvider.$get().STATIC_URL+'auth/login/';$provide.constant('horizon.auth.login.basePath',path);}})();