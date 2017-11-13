(function(){'use strict';angular.module('horizon.app.core.cloud-services').directive('hzIfApiVersion',hzIfApiVersion);hzIfApiVersion.$inject=['$q','hzPromiseToggleTemplateDirective','horizon.app.core.openstack-service-api.glance','horizon.app.core.openstack-service-api.keystone'];function hzIfApiVersion($q,hzPromiseToggle,glance,keystone){return angular.extend(hzPromiseToggle[0],{singlePromiseResolver:ifVersionEnabled,name:'hzIfApiVersion'});function ifVersionEnabled(expected){var deferred=$q.defer();var type=Object.keys(expected)[0];var operator=expected[Object.keys(expected)[1]];switch(type){case"glance":glance.getVersion().then(onSuccess);break;case"keystone":keystone.getVersion().then(onSuccess);break;}
function onSuccess(actual){var actualVersion=actual.data.version;var expectedVersion=expected[type];var isVersion=false;if(operator){if(angular.isNumber(actualVersion)&&angular.isNumber(expectedVersion)&&["<=","<","==",">",">="].indexOf(operator)>-1){var expr=actualVersion+operator+expectedVersion;isVersion=eval(expr);}}else{if(angular.equals(actualVersion,expectedVersion)){isVersion=true;}}
if(isVersion){deferred.resolve();}else{deferred.reject();}}
return deferred.promise;}}})();