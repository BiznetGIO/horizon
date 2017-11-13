(function(){'use strict';angular.module('horizon.framework.widgets.table').controller('horizon.framework.widgets.table.HzDynamicTableController',controller);controller.$inject=['$scope','horizon.framework.conf.permissions.service'];function controller($scope,permissionsService){$scope.items=[];$scope.columnAllowed=columnAllowed;var allowedColumns={};$scope.$watch("config",onConfigChange,true);function onConfigChange(newConfig){if(angular.isDefined(newConfig)){if(angular.isUndefined(newConfig.selectAll)){newConfig.selectAll=true;}
if(angular.isUndefined(newConfig.expand)){newConfig.expand=true;}
allowedColumns={};angular.forEach(newConfig.columns,checkPermissions);}}
function checkPermissions(column){permissionsService.checkAll(column).then(allow,disallow);function allow(){allowedColumns[column.id]=true;}
function disallow(){allowedColumns[column.id]=false;}}
function columnAllowed(column){return allowedColumns[column.id]||false;}}})();