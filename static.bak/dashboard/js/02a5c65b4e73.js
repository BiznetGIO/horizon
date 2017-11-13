(function(){'use strict';angular.module('horizon.app.core.openstack-service-api').factory('horizon.app.core.openstack-service-api.policy',PolicyService);PolicyService.$inject=['$q','horizon.framework.util.filters.$memoize','horizon.framework.util.http.service','horizon.framework.widgets.toast.service'];function PolicyService($q,memoize,apiService,toastService){var service={check:memoize(check,memoizeHasher),ifAllowed:memoize(ifAllowed,memoizeHasher)};return service;function check(policyRules){var deferred=$q.defer();apiService.post('/api/policy/',policyRules).success(function successPath(result){deferred.resolve(result);}).error(function failurePath(result){toastService.add('warning',gettext('Policy check failed.'));deferred.reject(result);});deferred.promise.success=deferred.promise.then;return deferred.promise;}
function ifAllowed(policyRules){var deferred=$q.defer();service.check(policyRules).then(success);return deferred.promise;function success(response){if(response.allowed){deferred.resolve();}else{deferred.reject();}}}
function memoizeHasher(policyRules){return angular.toJson(policyRules);}}}());