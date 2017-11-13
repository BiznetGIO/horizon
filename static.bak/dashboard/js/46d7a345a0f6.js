(function(){'use strict';angular.module('horizon.app.core.openstack-service-api').factory('horizon.app.core.openstack-service-api.settings',settingsService);settingsService.$inject=['$q','horizon.framework.util.http.service'];function settingsService($q,apiService){var service={getSettings:getSettings,getSetting:getSetting,ifEnabled:ifEnabled};return service;function getSettings(suppressError){function onError(){var message=gettext('Unable to retrieve settings.');if(!suppressError&&horizon.toast){horizon.toast.add('error',message);}
return message;}
return apiService.get('/api/settings/',{cache:true}).error(onError).then(function(response){return response.data;});}
function getSetting(path,defaultSetting){var deferred=$q.defer();var pathElements=path.split(".");var settingAtRequestedPath;function onSettingsLoaded(settings){settingAtRequestedPath=pathElements.reduce(function(setting,nextPathElement){return setting?setting[nextPathElement]:undefined;},settings);if(angular.isUndefined(settingAtRequestedPath)&&angular.isDefined(defaultSetting)){settingAtRequestedPath=defaultSetting;}
deferred.resolve(settingAtRequestedPath);}
function onSettingsFailure(message){deferred.reject(message);}
service.getSettings().then(onSettingsLoaded,onSettingsFailure);return deferred.promise;}
function ifEnabled(setting,expected,defaultSetting){var deferred=$q.defer();expected=angular.isUndefined(expected)?true:expected;function onSettingLoaded(setting){if(angular.equals(expected,setting)){deferred.resolve();}else{deferred.reject(interpolate(gettext('Setting is not enabled: %(setting)s'),{setting:setting},true));}
deferred.resolve(setting);}
function onSettingFailure(message){deferred.reject(message);}
service.getSetting(setting,defaultSetting).then(onSettingLoaded,onSettingFailure);return deferred.promise;}}}());