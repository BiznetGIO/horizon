(function(){'use strict';angular.module('horizon.framework.widgets.toast').factory('horizon.framework.widgets.toast.service',toastService);toastService.$inject=['$timeout','horizon.framework.conf.toastOptions'];function toastService($timeout,toastOptions){var toasts=[];var service={types:{},add:add,get:get,cancel:cancel,clearAll:clearAll,clearErrors:clearErrors,clearSuccesses:clearSuccesses};service.types={danger:gettext('Danger'),warning:gettext('Warning'),info:gettext('Info'),success:gettext('Success'),error:gettext('Error')};return service;function clear(type){for(var i=toasts.length-1;i>=0;i--){if(toasts[i].type===type){toasts.splice(i,1);}}}
function autoDismiss(toast){$timeout(function dismiss(){var index=toasts.indexOf(toast);var dismissible=toastOptions.dimissible.indexOf('alert-'+toast.type);if(index>-1&&dismissible>-1){toasts.splice(index,1);}},toastOptions.delay);}
function cancel(index){toasts.splice(index,1);}
function add(type,msg){var toast={type:type==='error'?'danger':type,typeMsg:this.types[type],msg:msg,cancel:cancel};autoDismiss(toast);toasts.push(toast);}
function get(){return toasts;}
function clearAll(){toasts=[];}
function clearErrors(){clear('danger');}
function clearSuccesses(){clear('success');}}})();