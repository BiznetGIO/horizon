(function(){'use strict';angular.module('horizon.framework.widgets.wizard').directive('wizard',wizard);wizard.$inject=['horizon.framework.widgets.basePath'];function wizard(basePath){var directive={controller:'WizardController',templateUrl:basePath+'wizard/wizard.html'};return directive;}})();