(function(){'use strict';angular.module('horizon.framework.widgets.action-list').directive('actionList',actionList);function actionList(){var directive={link:link,restrict:'E'};return directive;function link(scope,element){element.addClass('btn-group');}}})();