(function(){'use strict';angular.module('horizon.app.core.openstack-service-api').factory('horizon.app.core.openstack-service-api.serviceCatalog',serviceCatalog);serviceCatalog.$inject=['$cacheFactory','$q','horizon.app.core.openstack-service-api.keystone','horizon.app.core.openstack-service-api.userSession'];function serviceCatalog($cacheFactory,$q,keystoneAPI,userSession){var service={cache:$cacheFactory('horizon.app.core.openstack-service-api.serviceCatalog',{capacity:1}),get:get,ifTypeEnabled:ifTypeEnabled};return service;function get(){return keystoneAPI.serviceCatalog({cache:service.cache}).then(onGetCatalog);}
function onGetCatalog(response){return response.data;}
function ifTypeEnabled(desiredType){var deferred=$q.defer();$q.all({session:userSession.get(),catalog:service.get()}).then(onDataLoaded,onDataFailure);function onDataLoaded(d){if(typeHasEndpointsInRegion(d.catalog,desiredType,d.session.services_region)){deferred.resolve();}else{deferred.reject(interpolate(gettext('Service type is not enabled: %(desiredType)s'),{desiredType:desiredType},true));}}
function onDataFailure(){deferred.reject(gettext('Cannot get service catalog from keystone.'));}
return deferred.promise;}
function typeHasEndpointsInRegion(catalog,desiredType,desiredRegion){var matchingSvcs=catalog.filter(function filterByType(svc){return svc.type===desiredType;});if(desiredType==='identity'&&matchingSvcs.length>0){return true;}else{return matchingSvcs.some(function matchService(svc){return svc.endpoints.some(function matchEndpoint(endpoint){return getEndpointRegion(endpoint)===desiredRegion;});});}}
function getEndpointRegion(endpoint){return endpoint.region_id||endpoint.region;}}}());