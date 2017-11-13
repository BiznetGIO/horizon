(function(){'use strict';angular.module('horizon.app.core.flavors.actions',['horizon.framework.conf','horizon.app.core.flavors']).run(registerFlavorActions);registerFlavorActions.$inject=['horizon.framework.conf.resource-type-registry.service','horizon.app.core.flavors.actions.delete-flavor.service','horizon.app.core.flavors.actions.update-metadata.service','horizon.app.core.flavors.resourceType'];function registerFlavorActions(registry,deleteFlavorService,updateMetadataService,flavorResourceTypeCode){var flavorResourceType=registry.getResourceType(flavorResourceTypeCode);flavorResourceType.itemActions.append({id:'updateMetadataService',service:updateMetadataService,template:{text:gettext('Update Metadata')}}).append({id:'deleteFlavorAction',service:deleteFlavorService,template:{type:'delete',text:gettext('Delete Flavor')}});flavorResourceType.batchActions.append({id:'batchDeleteFlavorAction',service:deleteFlavorService,template:{type:'delete-selected',text:gettext('Delete Flavors')}});}})();