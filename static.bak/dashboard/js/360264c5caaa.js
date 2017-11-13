(function(){'use strict';angular.module('horizon.dashboard.identity.users',['ngRoute','horizon.dashboard.identity.users.details']).constant('horizon.dashboard.identity.users.resourceType','OS::Keystone::User').run(run).config(config);run.$inject=['horizon.framework.conf.resource-type-registry.service','horizon.dashboard.identity.users.basePath','horizon.dashboard.identity.users.resourceType','horizon.dashboard.identity.users.service'];function run(registry,basePath,userResourceType,usersService){registry.getResourceType(userResourceType).setNames(gettext('User'),gettext('Users')).setSummaryTemplateUrl(basePath+'details/drawer.html').setProperties(userProperties()).setListFunction(usersService.getUsersPromise).setNeedsFilterFirstFunction(usersService.getFilterFirstSettingPromise).tableColumns.append({id:'name',priority:1,sortDefault:true,urlFunction:usersService.getDetailsPath}).append({id:'email',priority:2,filters:['noValue'],template:'<a ng-href="mailto:{$ item.email $}">{$ item.email $}</a>'}).append({id:'id',priority:1}).append({id:'enabled',priority:2,filters:['yesno']});registry.getResourceType(userResourceType).filterFacets.append({label:gettext('Name'),name:'name',singleton:true,isServer:true}).append({label:gettext('Email'),name:'email',singleton:true}).append({label:gettext('ID'),name:'id',singleton:true,isServer:true}).append({label:gettext('Enabled'),name:'enabled',singleton:true,isServer:true,options:[{label:gettext('Yes'),key:'true'},{label:gettext('No'),key:'false'}]});function userProperties(){return{name:gettext('Name'),email:{label:gettext('Email'),filters:['noValue']},id:gettext('ID'),enabled:{label:gettext('Enabled'),filters:['yesno']},domain_id:{label:gettext('Domain ID'),filters:['noValue']},domain_name:{label:gettext('Domain Name'),filters:['noValue']},description:{label:gettext('Description'),filters:['noValue']},default_project_id:{label:gettext('Primary Project ID'),filters:['noValue']},project_name:{label:gettext('Primary Project Name'),filters:['noValue']}};}}
config.$inject=['$provide','$windowProvider','$routeProvider'];function config($provide,$windowProvider,$routeProvider){var path=$windowProvider.$get().STATIC_URL+'dashboard/identity/users/';$provide.constant('horizon.dashboard.identity.users.basePath',path);$routeProvider.when('/identity/users',{templateUrl:path+'panel.html'});}})();