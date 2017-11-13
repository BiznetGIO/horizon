(function(){'use strict';angular.module('horizon.framework.conf').factory('horizon.framework.conf.resource-type-registry.service',registryService);registryService.$inject=['horizon.framework.util.extensible.service','$log'];function registryService(extensibleService,$log){function ResourceType(typeCode){var self=this;var names=[];var properties={};self.type=typeCode;self.initActions=initActions;self.setProperty=setProperty;self.setProperties=setProperties;self.getProperties=getProperties;self.getName=getName;self.setNames=setNames;self.label=label;self.load=defaultLoadFunction;self.setLoadFunction=setLoadFunction;self.isLoadFunctionSet=isLoadFunctionSet;self.list=defaultListFunction;self.setListFunction=setListFunction;self.isListFunctionSet=isListFunctionSet;self.itemInTransitionFunction=defaultItemInTransitionFunction;self.setItemInTransitionFunction=setItemInTransitionFunction;self.itemName=itemName;self.setItemNameFunction=setItemNameFunction;self.setPathParser=setPathParser;self.parsePath=parsePath;self.setPathGenerator=setPathGenerator;self.path=path;self.needsFilterFirstFunction=defaultNeedsFilterFirstFunction;self.setNeedsFilterFirstFunction=setNeedsFilterFirstFunction;self.itemActions=[];extensibleService(self.itemActions,self.itemActions);self.batchActions=[];extensibleService(self.batchActions,self.batchActions);self.globalActions=[];extensibleService(self.globalActions,self.globalActions);self.detailsViews=[];extensibleService(self.detailsViews,self.detailsViews);self.tableColumns=[];extensibleService(self.tableColumns,self.tableColumns);self.getTableColumns=getTableColumns;self.filterFacets=[];extensibleService(self.filterFacets,self.filterFacets);self.summaryTemplateUrl=false;self.setSummaryTemplateUrl=setSummaryTemplateUrl;function initActions(scope){angular.forEach(self.itemActions,setActionScope);angular.forEach(self.batchActions,setActionScope);angular.forEach(self.globalActions,setActionScope);function setActionScope(action){if(action.service.initAction){action.service.initAction();}else if(action.service.initScope){$log.warn('The initScope() method is deprecated. '+'Invocation of it will stop in Queens.');action.service.initScope(scope.$new());}}}
function setProperty(name,prop){properties[name]=prop;return self;}
function setProperties(properties){angular.forEach(properties,function(value,key){var prop=angular.isString(value)?{label:value}:value;setProperty(key,prop);});return this;}
function getProperties(){return angular.copy(properties);}
function setListFunction(func){self.list=func;return self;}
function isListFunctionSet(){return self.list!==defaultListFunction;}
function defaultListFunction(){$log.error('No list function defined for',typeCode);return Promise.reject({data:{items:[]}});}
function defaultItemInTransitionFunction(){return false;}
function setItemInTransitionFunction(func){self.itemInTransitionFunction=func;return self;}
function getTableColumns(){return self.tableColumns.map(mapTableInfo);function mapTableInfo(x){var tableInfo=x;tableInfo.title=x.title||label(x.id);if(properties[x.id]&&properties[x.id].values){tableInfo.values=properties[x.id].values;}
if(properties[x.id]&&properties[x.id].filters){tableInfo.filters=properties[x.id].filters;}
return tableInfo;}}
function setPathParser(func){self.parsePath=func;return self;}
function parsePath(subpath){return subpath;}
function setLoadFunction(func){self.load=func;return self;}
function isLoadFunctionSet(){return self.load!==defaultLoadFunction;}
function defaultLoadFunction(spec){$log.error('No load function defined for',typeCode,'with spec',spec);return Promise.reject({data:{}});}
function setPathGenerator(func){self.path=func;return self;}
function path(item){return''+item.id;}
function setSummaryTemplateUrl(url){self.summaryTemplateUrl=url;return self;}
function setItemNameFunction(func){self.itemName=func;return self;}
function itemName(item){return item.name;}
function getName(count){if(names){return ngettext.apply(null,names.concat([count]));}}
function setNames(singular,plural){names=[singular,plural];return self;}
function label(name){var prop=properties[name];if(angular.isDefined(prop)&&angular.isDefined(prop.label)){return prop.label;}
return name;}
function defaultNeedsFilterFirstFunction(){return Promise.resolve(false);}
function setNeedsFilterFirstFunction(func){self.needsFilterFirstFunction=func;return self;}}
var registry={resourceTypes:{},defaultSummaryTemplateUrl:false,defaultDetailsTemplateUrl:false,getResourceType:getResourceType,getGlobalActions:getGlobalActions,setDefaultSummaryTemplateUrl:setDefaultSummaryTemplateUrl,getDefaultSummaryTemplateUrl:getDefaultSummaryTemplateUrl,setDefaultDetailsTemplateUrl:setDefaultDetailsTemplateUrl,getDefaultDetailsTemplateUrl:getDefaultDetailsTemplateUrl};function getDefaultSummaryTemplateUrl(){return registry.defaultSummaryTemplateUrl;}
function setDefaultSummaryTemplateUrl(url){registry.defaultSummaryTemplateUrl=url;return registry;}
function getDefaultDetailsTemplateUrl(){return registry.defaultDetailsTemplateUrl;}
function setDefaultDetailsTemplateUrl(url){registry.defaultDetailsTemplateUrl=url;return registry;}
function getGlobalActions(){var actions=[];angular.forEach(registry.resourceTypes,appendActions);return actions;function appendActions(type){actions=actions.concat(type.globalActions);}}
function getResourceType(typeCode){if(!registry.resourceTypes.hasOwnProperty(typeCode)){registry.resourceTypes[typeCode]=new ResourceType(typeCode);}
return registry.resourceTypes[typeCode];}
return registry;}})();