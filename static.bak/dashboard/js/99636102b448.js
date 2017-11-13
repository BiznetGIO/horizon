(function(){'use strict';angular.module('horizon.framework.widgets.action-list').directive('buttonTooltip',buttonTooltip);buttonTooltip.$inject=['$compile','$http','$templateCache','horizon.framework.widgets.action-list.tooltipConfig'];function buttonTooltip($compile,$http,$templateCache,tooltipConfig){var directive={link:link,restrict:'A',scope:{btDisabled:'=?',btMessage:'=buttonTooltip',btModel:'=?',btPlacement:'=?'}};return directive;function link(scope,element){var tooltip=scope.btModel||{};var template=tooltip.template||tooltipConfig.defaultTemplate;if(tooltip.templateUrl){$http.get(tooltip.templateUrl,{cache:$templateCache}).then(function(response){template=response.data;});}
element.on('blur','button',btnBlur);element.on('mousedown',btnMouseDown);element.on('mouseup',btnMouseUp);function btnBlur(){element.popover('destroy');}
function btnMouseDown(){if(!scope.btDisabled){var popoverElt=element.next('.popover');if(popoverElt.length){element.popover('destroy');}else{createTooltip();}
return false;}}
function btnMouseUp(){if(!scope.btDisabled){element.find('button').first().focus();}}
function createTooltip(){var tooltipData=angular.extend({},tooltip.data);tooltipData.message=scope.btMessage||tooltipConfig.defaultMessage.message;var tooltipScope=scope.$new(true);angular.extend(tooltipScope,tooltipData);tooltipScope.element=element;var compiledTemplate=$compile(template)(tooltipScope);tooltipScope.$apply();var options={content:compiledTemplate,html:true,placement:scope.btPlacement||'left',trigger:'manual'};element.popover(options);element.popover('show');}}}})();