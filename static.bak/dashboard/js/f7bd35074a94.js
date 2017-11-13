(function(){"use strict";angular.module('horizon.app.core.images').controller('ImageOverviewController',ImageOverviewController);ImageOverviewController.$inject=['horizon.app.core.images.resourceType','horizon.framework.conf.resource-type-registry.service','horizon.app.core.openstack-service-api.userSession','$scope'];function ImageOverviewController(imageResourceTypeCode,registry,userSession,$scope){var ctrl=this;ctrl.resourceType=registry.getResourceType(imageResourceTypeCode);$scope.context.loadPromise.then(onGetImage);function onGetImage(image){ctrl.image=image.data;ctrl.image.properties=Object.keys(ctrl.image.properties).map(function mapProps(prop){var propValue=ctrl.image.properties[prop];if(angular.isArray(propValue)&&propValue.length===0){propValue='';}
return{name:prop,value:propValue};});userSession.get().then(setProject);function setProject(session){ctrl.projectId=session.project_id;}}}})();