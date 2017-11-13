(function(){'use strict';angular.module('horizon.app.core.metadata.modal').controller('MetadataModalController',MetadataModalController);MetadataModalController.$inject=['$uibModalInstance','horizon.app.core.metadata.service','horizon.framework.widgets.metadata.tree.service','horizon.framework.widgets.toast.service','available','existing','params'];function MetadataModalController($uibModalInstance,metadataService,metadataTreeService,toastService,available,existing,params){var ctrl=this;ctrl.cancel=cancel;ctrl.resourceType=params.resource;ctrl.save=save;ctrl.saving=false;ctrl.tree=new metadataTreeService.Tree(available.data.items,existing.data);function save(){ctrl.saving=true;var updated=ctrl.tree.getExisting();var removed=angular.copy(existing.data);angular.forEach(removed,function bug1606988(value,removedKey){angular.forEach(ctrl.tree.flatTree,function compareToDefinitions(item){if(item.leaf&&removedKey.toLocaleLowerCase()===item.leaf.name.toLocaleLowerCase()){delete removed[removedKey];removed[item.leaf.name]=value;}});});angular.forEach(updated,function(value,key){delete removed[key];});metadataService.editMetadata(params.resource,params.id,updated,Object.keys(removed)).then(onEditSuccess,onEditFailure);}
function cancel(){$uibModalInstance.dismiss('cancel');}
function onEditSuccess(){toastService.add('success',gettext('Metadata was successfully updated.'));$uibModalInstance.close();}
function onEditFailure(){toastService.add('error',gettext('Unable to update metadata.'));ctrl.saving=false;}}})();