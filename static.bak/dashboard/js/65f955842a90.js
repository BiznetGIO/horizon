(function(){'use strict';angular.module('horizon.app.core.openstack-service-api').factory('horizon.app.core.openstack-service-api.novaExtensions',novaExtensionsAPI);novaExtensionsAPI.$inject=['$cacheFactory','horizon.app.core.openstack-service-api.extensions','horizon.app.core.openstack-service-api.nova'];function novaExtensionsAPI($cacheFactory,extensionsAPI,novaAPI){return extensionsAPI({cacheFactory:$cacheFactory('horizon.app.core.openstack-service-api.novaExtensions',{capacity:1}),serviceAPI:novaAPI});}}());