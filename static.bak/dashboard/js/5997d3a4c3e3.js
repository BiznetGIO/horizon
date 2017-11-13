(function(){'use strict';angular.module('horizon.app.core.openstack-service-api').factory('horizon.app.core.openstack-service-api.swift',swiftAPI);swiftAPI.$inject=['horizon.framework.util.http.service','horizon.framework.widgets.toast.service'];function swiftAPI(apiService,toastService){var service={copyObject:copyObject,createContainer:createContainer,createFolder:createFolder,deleteContainer:deleteContainer,deleteObject:deleteObject,getContainer:getContainer,getContainers:getContainers,getInfo:getInfo,getContainerURL:getContainerURL,getObjectDetails:getObjectDetails,getObjects:getObjects,getObjectURL:getObjectURL,setContainerAccess:setContainerAccess,uploadObject:uploadObject};return service;function getContainerURL(container){return'/api/swift/containers/'+encodeURIComponent(container);}
function getObjectURL(container,object,type){var urlType=type||'object';var objectUrl=encodeURIComponent(object).replace(/%2F/g,'/');return getContainerURL(container)+'/'+urlType+'/'+objectUrl;}
function getInfo(){return apiService.get('/api/swift/info/').error(function(){toastService.add('error',gettext('Unable to get the Swift service info.'));});}
function getContainers(params){var config=params?{'params':params}:{};return apiService.get('/api/swift/containers/',config).error(function(){toastService.add('error',gettext('Unable to get the Swift container listing.'));});}
function getContainer(container,ignoreError){var promise=apiService.get(service.getContainerURL(container)+'/metadata/');if(ignoreError){return promise.error(angular.noop);}
return promise.error(function(){toastService.add('error',gettext('Unable to get the container details.'));});}
function createContainer(container,isPublic){var data={is_public:false};if(isPublic){data.is_public=true;}
return apiService.post(service.getContainerURL(container)+'/metadata/',data).error(function(response){if(response.status===409){toastService.add('error',response);}else{toastService.add('error',gettext('Unable to create the container.'));}});}
function deleteContainer(container){return apiService.delete(service.getContainerURL(container)+'/metadata/').error(function(response,status){if(status===409){toastService.add('error',response);}else{toastService.add('error',gettext('Unable to delete the container.'));}});}
function setContainerAccess(container,isPublic){var data={is_public:isPublic};return apiService.put(service.getContainerURL(container)+'/metadata/',data).error(function(){toastService.add('error',gettext('Unable to change the container access.'));});}
function getObjects(container,params){var options={};if(params){options.params=params;}
return apiService.get(service.getContainerURL(container)+'/objects/',options).error(function(){toastService.add('error',gettext('Unable to get the objects in container.'));});}
function uploadObject(container,objectName,file){return apiService.post(service.getObjectURL(container,objectName),{file:file}).error(function(){toastService.add('error',gettext('Unable to upload the object.'));});}
function deleteObject(container,objectName){return apiService.delete(service.getObjectURL(container,objectName)).error(function(response){if(response.status===409){toastService.add('error',gettext('Unable to delete the folder because it is not empty.'));}else{toastService.add('error',gettext('Unable to delete the object.'));}});}
function getObjectDetails(container,objectName,ignoreError){var promise=apiService.get(service.getObjectURL(container,objectName,'metadata'));if(ignoreError){return promise.error(angular.noop);}
return promise.error(function(){toastService.add('error',gettext('Unable to get details of the object.'));});}
function createFolder(container,folderName){return apiService.post(service.getObjectURL(container,folderName)+'/',{}).error(function(response,status){if(status===409){toastService.add('error',response);}else{toastService.add('error',gettext('Unable to create the folder.'));}});}
function copyObject(container,objectName,destContainer,destName){return apiService.post(service.getObjectURL(container,objectName,'copy'),{dest_container:destContainer,dest_name:destName}).error(function(response,status){if(status===409){toastService.add('error',response);}else{toastService.add('error',gettext('Unable to copy the object.'));}});}}}());