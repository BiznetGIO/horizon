(function(){'use strict';angular.module('horizon.framework.widgets.metadata.tree').controller('MetadataTreeItemController',MetadataTreeItemController);function MetadataTreeItemController(){var ctrl=this;ctrl.formatErrorMessage=formatErrorMessage;ctrl.opened=false;if('item'in ctrl&&'leaf'in ctrl.item&&ctrl.item.leaf.type==='array'){ctrl.values=ctrl.item.leaf.items.enum.filter(filter).sort();if(!ctrl.item.leaf.readonly){ctrl.addValue=addValue;ctrl.removeValue=removeValue;ctrl.switchOpened=switchOpened;ctrl.opened=ctrl.item.leaf.value.length===0;}}
function formatErrorMessage(item,error){if(error.min){return ctrl.text.min+' '+item.leaf.minimum;}
if(error.max){return ctrl.text.max+' '+item.leaf.maximum;}
if(error.minlength){return ctrl.text.minLength+' '+item.leaf.minLength;}
if(error.maxlength){return ctrl.text.maxLength+' '+item.leaf.maxLength;}
if(error.pattern){if(item.leaf.type==='integer'){return ctrl.text.integerRequired;}else{return ctrl.text.patternMismatch;}}
if(error.number){if(item.leaf.type==='integer'){return ctrl.text.integerRequired;}else{return ctrl.text.decimalRequired;}}
if(error.required){return ctrl.text.required;}}
function filter(i){return ctrl.item.leaf.value.indexOf(i)<0;}
function remove(array,value){var index=array.indexOf(value);if(index>-1){array.splice(index,1);}
return array;}
function addValue(val){ctrl.item.leaf.value.push(val);ctrl.item.leaf.value.sort();remove(ctrl.values,val);}
function removeValue(val){remove(ctrl.item.leaf.value,val);ctrl.values.push(val);ctrl.values.sort();if(ctrl.item.leaf.value.length===0){ctrl.opened=true;}}
function switchOpened(){ctrl.opened=!ctrl.opened;}}})();