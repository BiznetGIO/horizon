(function(){'use strict';angular.module('horizon.framework.util.actions').factory('horizon.framework.util.actions.action-result.service',factory);function factory(){return{getActionResult:getActionResult,getIdsOfType:getIdsOfType};function getIdsOfType(items,type){return items?items.reduce(typeIdReduce,[]):[];function typeIdReduce(accumulator,item){if(angular.isUndefined(type)||item.type===type){accumulator.push(item.id);}
return accumulator;}}
function getActionResult(){return new ActionResult();}
function ActionResult(){this.result={created:[],updated:[],deleted:[],failed:[]};this.created=created;this.updated=updated;this.deleted=deleted;this.failed=failed;function created(type,id){this.result.created.push({type:type,id:id});return this;}
function updated(type,id){this.result.updated.push({type:type,id:id});return this;}
function deleted(type,id){this.result.deleted.push({type:type,id:id});return this;}
function failed(type,id){this.result.failed.push({type:type,id:id});return this;}}}})();