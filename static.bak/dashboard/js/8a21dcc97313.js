(function(){'use strict';angular.module('horizon.framework.widgets.magic-search').controller('MagicSearchController',magicSearchController);magicSearchController.$inject=['$scope','$element','$timeout','$window','horizon.framework.widgets.magic-search.service','horizon.framework.widgets.magic-search.events'];function magicSearchController($scope,$element,$timeout,$window,service,magicSearchEvents){var ctrl=this;var searchInput=$element.find('.search-input');ctrl.mainPromptString=$scope.strings.prompt;ctrl.currentSearch=[];ctrl.isMenuOpen=false;searchInput.on('keydown',keyDownHandler);searchInput.on('keyup',keyUpHandler);searchInput.on('keypress',keyPressHandler);$element.find('.search-main-area').on('click',searchMainClickHandler);ctrl.facetClicked=facetClickHandler;ctrl.optionClicked=optionClickHandler;ctrl.removeFacet=removeFacet;ctrl.clearSearch=clearSearch;ctrl.isMatchLabel=function(label){return angular.isArray(label);};ctrl.unusedFacetChoices=[];ctrl.facetChoices=[];initSearch(service.getSearchTermsFromQueryString($window.location.search));emitQuery();$scope.$on(magicSearchEvents.INIT_SEARCH,function(event,data){if(data){if(data.textSearch){ctrl.textSearch=data.textSearch;}else{ctrl.textSearch=undefined;searchInput.val('');}
initSearch(data.magicSearchQuery||[]);}});function initSearch(initialSearchTerms){ctrl.facetChoices=service.getFacetChoicesFromFacetsParam($scope.facets_param);initFacets(initialSearchTerms);}
function keyDownHandler($event){var key=service.getEventCode($event);if(key===9){$event.preventDefault();}else if(key===8){backspaceKeyDown();}}
function tabKeyUp(){if(angular.isUndefined(ctrl.facetSelected)){if(ctrl.filteredObj.length!==1){return;}
ctrl.facetClicked(0,'',ctrl.filteredObj[0].name);}else{if(angular.isUndefined(ctrl.filteredOptions)||ctrl.filteredOptions.length!==1){return;}
ctrl.optionClicked(0,'',ctrl.filteredOptions[0].key);resetState();}}
function escapeKeyUp(){if(angular.isDefined(ctrl.facetSelected)){setMenuOpen(true);}else{setMenuOpen(false);}
resetState();var textFilter=ctrl.textSearch;if(angular.isUndefined(textFilter)){textFilter='';}
emitTextSearch(textFilter);}
function enterKeyUp(){var searchVal=searchInput.val();if(searchVal!==''){if(ctrl.facetSelected){var curr=ctrl.facetSelected;curr.name=curr.name.split('=')[0]+'='+searchVal;curr.label[1]=searchVal;ctrl.currentSearch.push(curr);resetState();emitQuery();setMenuOpen(true);}else{ctrl.currentSearch=ctrl.currentSearch.filter(notTextSearch);ctrl.currentSearch.push(service.getTextFacet(searchVal,$scope.strings.text));$scope.$apply();setMenuOpen(true);setSearchInput('');emitTextSearch(searchVal);ctrl.textSearch=searchVal;}}else if(ctrl.isMenuOpen){setMenuOpen(false);}else{setMenuOpen(true);}
ctrl.filteredObj=ctrl.unusedFacetChoices;}
function backspaceKeyDown(){var searchVal=searchInput.val();if(searchVal===''){if(ctrl.currentSearch.length>0&&angular.isUndefined(ctrl.facetSelected)){ctrl.removeFacet(ctrl.currentSearch.length-1);setMenuOpen(true);}else{escapeKeyUp();}}}
function backspaceKeyUp(){var searchVal=searchInput.val();if(searchVal===''&&angular.isUndefined(ctrl.facetSelected)){if(ctrl.currentSearch.length===0){ctrl.clearSearch();}else{resetState();emitTextSearch(ctrl.textSearch||'');}}else{filterFacets(searchVal);}}
function deleteKeyUp(){return backspaceKeyUp();}
function notTextSearch(item){return item.name.indexOf('text')!==0;}
function defaultKeyUp(){var searchVal=searchInput.val();filterFacets(searchVal);}
function keyUpHandler($event){if($event.metaKey===true){return;}
var key=service.getEventCode($event);var handlers={8:backspaceKeyUp,9:tabKeyUp,27:escapeKeyUp,13:enterKeyUp,46:deleteKeyUp};if(handlers[key]){handlers[key]();}else{defaultKeyUp();}}
function keyPressHandler($event){var searchVal=searchInput.val();var key=service.getEventCode($event);if(key!==8&&key!==46&&key!==13&&key!==9&&key!==27){searchVal=searchVal+String.fromCharCode(key).toLowerCase();}
if(searchVal===' '){setMenuOpen(true);setSearchInput('');return;}
if(searchVal===''){return;}
if(key!==8&&key!==46&&!(key>=37&&key<=40)){filterFacets(searchVal);}}
function filterFacets(searchVal){var filtered=[];var isTextSearch=angular.isUndefined(ctrl.facetSelected);if(isTextSearch){ctrl.filteredObj=ctrl.unusedFacetChoices;filtered=service.getMatchingFacets(ctrl.filteredObj,searchVal);}else{ctrl.filteredOptions=ctrl.facetOptions;if(angular.isUndefined(ctrl.facetOptions)){return;}
filtered=service.getMatchingOptions(ctrl.filteredOptions,searchVal);}
if(filtered.length>0){setMenuOpen(true);$timeout(function(){ctrl.filteredObj=filtered;},0.1);}else if(isTextSearch){emitTextSearch(searchVal);setMenuOpen(false);}}
function searchMainClickHandler($event){var target=angular.element($event.target);if(target.is('.search-main-area')){searchInput.trigger('focus');setMenuOpen(true);}}
function facetClickHandler($index){var facet=ctrl.filteredObj[$index];var label=facet.label;if(angular.isArray(label)){label=label.join('');}
var facetParts=facet.name&&facet.name.split('=');ctrl.facetSelected=service.getFacet(facetParts[0],facetParts[1],label,'');if(angular.isDefined(facet.options)){ctrl.filteredOptions=ctrl.facetOptions=facet.options;setMenuOpen(true);}else{setMenuOpen(false);}
setSearchInput('');setPrompt('');$timeout(function(){searchInput.focus();});}
function optionClickHandler($index,$event,name){setMenuOpen(false);var curr=ctrl.facetSelected;curr.name=curr.name.split('=')[0]+'='+name;curr.label[1]=ctrl.filteredOptions[$index].label;if(angular.isArray(curr.label[1])){curr.label[1]=curr.label[1].join('');}
ctrl.currentSearch.push(curr);resetState();emitQuery();}
function emitTextSearch(val){$scope.$emit(magicSearchEvents.TEXT_SEARCH,val,$scope.filter_keys);}
function emitQuery(removed){var query=service.getQueryPattern(ctrl.currentSearch);if(angular.isDefined(removed)&&removed.indexOf('text')===0){emitTextSearch('');delete ctrl.textSearch;}else{$scope.$emit(magicSearchEvents.SEARCH_UPDATED,query);if(ctrl.currentSearch.length>0){var newFacet=ctrl.currentSearch[ctrl.currentSearch.length-1].name;var facetParts=service.getSearchTermObject(newFacet);service.removeChoice(facetParts,ctrl.facetChoices,ctrl.unusedFacetChoices);}}}
function clearSearch(){ctrl.currentSearch=[];delete ctrl.textSearch;ctrl.unusedFacetChoices=ctrl.facetChoices.map(service.getFacetChoice);resetState();$scope.$emit(magicSearchEvents.SEARCH_UPDATED,'');emitTextSearch('');}
function resetState(){setSearchInput('');ctrl.filteredObj=ctrl.unusedFacetChoices;delete ctrl.facetSelected;delete ctrl.facetOptions;delete ctrl.filteredOptions;if(ctrl.currentSearch.length===0){setPrompt(ctrl.mainPromptString);}}
function setMenuOpen(bool){$timeout(function setMenuOpenTimeout(){ctrl.isMenuOpen=bool;});}
function setSearchInput(val){$timeout(function setSearchInputTimeout(){searchInput.val(val);});}
function setPrompt(str){$timeout(function setPromptTimeout(){$scope.strings.prompt=str;});}
var facetsChangedWatcher=$scope.$on(magicSearchEvents.FACETS_CHANGED,function(event,data){$timeout(function(){if(data&&data.magicSearchQuery){initSearch(data.magicSearchQuery.split('&'));}else{initSearch(ctrl.currentSearch.map(function(x){return x.name;}));}});});$scope.$on('$destroy',function(){facetsChangedWatcher();});function initFacets(searchTerms){var tmpFacetChoices=ctrl.facetChoices.map(service.getFacetChoice);if(searchTerms.length>1||searchTerms[0]&&searchTerms[0].length>0){setPrompt('');}
ctrl.currentSearch=service.getFacetsFromSearchTerms(searchTerms,ctrl.textSearch,$scope.strings.text,tmpFacetChoices);ctrl.filteredObj=ctrl.unusedFacetChoices=service.getUnusedFacetChoices(tmpFacetChoices,searchTerms);$scope.$emit(magicSearchEvents.CHECK_FACETS,ctrl.currentSearch);}
function removeFacet(index){var removed=ctrl.currentSearch[index].name;ctrl.currentSearch.splice(index,1);if(angular.isUndefined(ctrl.facetSelected)){emitQuery(removed);}else{resetState();}
if(ctrl.currentSearch.length===0){setPrompt(ctrl.mainPromptString);}
initFacets(ctrl.currentSearch.map(service.getName));}}})();