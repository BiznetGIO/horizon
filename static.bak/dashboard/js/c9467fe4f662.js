(function(){'use strict';angular.module('horizon.app.core.network_qos',['ngRoute','horizon.app.core.network_qos.details']).constant('horizon.app.core.network_qos.resourceType','OS::Neutron::QoSPolicy').run(run).config(config);run.$inject=['horizon.framework.conf.resource-type-registry.service','horizon.app.core.network_qos.basePath','horizon.app.core.network_qos.service','horizon.app.core.network_qos.resourceType'];function run(registry,basePath,qosService,qosResourceType){registry.getResourceType(qosResourceType).setNames(gettext('QoS Policy'),gettext('QoS Policies')).setSummaryTemplateUrl(basePath+'details/drawer.html').setProperties(qosProperties(qosService)).setListFunction(qosService.getPoliciesPromise).tableColumns.append({id:'name',priority:1,sortDefault:true,urlFunction:qosService.getDetailsPath}).append({id:'description',priority:1}).append({id:'shared',priority:1});registry.getResourceType(qosResourceType).filterFacets.append({label:gettext('Policy Name'),name:'name',singleton:true,persistent:true}).append({label:gettext('Description'),name:'description',singleton:true}).append({label:gettext('Shared'),name:'shared',singleton:true,options:[{label:gettext('Yes'),key:'true'},{label:gettext('No'),key:'false'}]});}
function qosProperties(){return{name:gettext('Policy Name'),id:gettext('Policy ID'),description:gettext('Description'),shared:{label:gettext('Shared'),filters:['yesno']},tenant_id:gettext('Tenant ID'),project_id:gettext('Project ID'),created_at:gettext('Created At'),updated_at:gettext('Updated At'),rules:gettext('Rules'),revision_number:gettext('Revision Number')};}
config.$inject=['$provide','$windowProvider','$routeProvider','horizon.app.core.detailRoute'];function config($provide,$windowProvider,$routeProvider,detailRoute){var path=$windowProvider.$get().STATIC_URL+'app/core/network_qos/';$provide.constant('horizon.app.core.network_qos.basePath',path);$routeProvider.when('/project/network_qos',{templateUrl:path+'panel.html'}).when('/project/network_qos/:policy_id',{redirectTo:goToAngularDetails});function goToAngularDetails(params){return detailRoute+'OS::Neutron::QoSPolicy/'+params.id;}}})();