(function(){'use strict';angular.module('horizon.framework.widgets.transfer-table').filter('filterAvailable',filterAvailable);filterAvailable.$inject=['horizon.framework.util.filters.$memoize'];function filterAvailable($memoize){return $memoize($filterAvailable,$hasher);function $idKeyOrDefault(primaryKey){return primaryKey||'id';}
function arrayIsEmpty(array){return angular.isUndefined(array)||!array.length;}
function emptyObj(obj){return angular.isUndefined(obj)||!Object.keys(obj).length;}
function $hasher(available,allocatedIds,primaryKey){if(arrayIsEmpty(available)){return'';}
primaryKey=$idKeyOrDefault(primaryKey);var key=available.map(function(item){return item[primaryKey];}).sort().join('_');return key+'_'+Object.keys(allocatedIds).sort().join('_');}
function $filterAvailable(available,allocatedKeys,primaryKey){if(arrayIsEmpty(available)){return[];}else if(emptyObj(allocatedKeys)){return available;}
primaryKey=$idKeyOrDefault(primaryKey);return available.filter(function isItemAvailable(item){return!(item[primaryKey]in allocatedKeys);});}}})();