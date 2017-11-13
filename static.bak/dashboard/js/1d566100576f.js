(function(){'use strict';angular.module('horizon.framework.widgets.magic-search').factory('horizon.framework.widgets.magic-search.service',magicSearchService);magicSearchService.$inject=[];function magicSearchService(){var service={getFacetChoice:getFacetChoice,removeOptionChoice:removeOptionChoice,removeFacetChoice:removeFacetChoice,removeChoice:removeChoice,getEventCode:getEventCode,getFacet:getFacet,getSearchTermsFromQueryString:getSearchTermsFromQueryString,getFacetChoicesFromFacetsParam:getFacetChoicesFromFacetsParam,getFacetsFromSearchTerms:getFacetsFromSearchTerms,getSearchTermObject:getSearchTermObject,getMatchingFacets:getMatchingFacets,getMatchingOptions:getMatchingOptions,getName:getName,getTextFacet:getTextFacet,getUnusedFacetChoices:getUnusedFacetChoices,getQueryPattern:getQueryPattern,getQueryObject:getQueryObject};return service;function objectify(obj){return Object.create(obj);}
function hasOptions(item){return angular.isDefined(item.options);}
function getTextFacet(searchVal,label){return getFacet('text',searchVal,label,searchVal);}
function getFacet(field,value,typeLabel,searchLabel){return{'name':field+'='+value,'label':[typeLabel,searchLabel]};}
function getSearchTermsFromQueryString(queryString){return queryString.replace(/^\?/,'').split('&');}
function getName(obj){return obj.name;}
function getQueryPattern(searchTermList){return searchTermList.filter(isNotTextSearch).map(getName).join('&');function isNotTextSearch(item){return item.name.indexOf('text')!==0;}}
function matchesName(name){return function(facet){return name===facet.name;};}
function matchesKey(name){return function(option){return name===option.key;};}
function hasLabel(item){return angular.isDefined(item.label);}
function getSearchTermObject(str){var parts=str.split('=');return{type:parts[0],value:parts[1]};}
function itemToLabel(item,search){var idx=item.label.toLowerCase().indexOf(search);if(idx>-1){return[item.label.substring(0,idx),item.label.substring(idx,idx+search.length),item.label.substring(idx+search.length)];}}
function execForMatchingChoice(facetChoices,name,func){facetChoices.filter(matchesName(name)).forEach(func);}
function getEventCode(evt){return evt.which||evt.keyCode||evt.charCode;}
function getFacetChoice(orig){var facetChoice=objectify(orig);if(angular.isDefined(orig.options)){facetChoice.options=orig.options.map(objectify);}
return facetChoice;}
function getMatchingOptions(list,search){return list.map(processOption).filter(hasLabel);function processOption(option){return{'key':option.key,'label':itemToLabel(option,search)};}}
function getMatchingFacets(list,search){return list.map(processFacet).filter(hasLabel);function processFacet(facet){return{'name':facet.name,'label':itemToLabel(facet,search),'options':facet.options};}}
function getFacetChoicesFromFacetsParam(param){if(angular.isString(param)){var tmp=param.replace(/__apos__/g,"\'").replace(/__dquote__/g,'\\"').replace(/__bslash__/g,"\\");return angular.fromJson(tmp);}
return param;}
function getFacetsFromSearchTerms(searchTerms,textSearch,textSearchLabel,facetChoices){var buff=[];searchTerms.map(getSearchTermObject).forEach(getFacetFromObj);if(angular.isDefined(textSearch)){var currentTextSearch=searchTerms.filter(function(searchField){return searchField.indexOf(textSearch)===0;});if(currentTextSearch.length===0){buff.push(getTextFacet(textSearch,textSearchLabel));}}
return buff;function getFacetFromObj(searchTermObj){execForMatchingChoice(facetChoices,searchTermObj.type,addFacet);function addFacet(facetChoice){if(angular.isUndefined(facetChoice.options)){buff.push(getFacet(searchTermObj.type,searchTermObj.value,facetChoice.label,searchTermObj.value));}else{facetChoice.options.filter(matchesKey(searchTermObj.value)).forEach(function(option){buff.push(getFacet(searchTermObj.type,searchTermObj.value,facetChoice.label,option.label));});}}}}
function getUnusedFacetChoices(facetChoices,facets){var unused=angular.copy(facetChoices);facets.map(getSearchTermObject).forEach(processSearchTerm);return unused;function processSearchTerm(searchTerm){execForMatchingChoice(unused,searchTerm.type,removeFoundChoice);function removeFoundChoice(choice){if(angular.isUndefined(choice.options)){removeFacetChoice(searchTerm.type,unused);}else if(choice.options.some(matchesKey(searchTerm.value))){removeSingleChoice(choice,searchTerm,unused);}}}}
function removeFacetChoice(type,target){execForMatchingChoice(target.slice(),type,removeFacet);function removeFacet(facet){target.splice(target.indexOf(facet),1);}}
function removeSingleChoice(facetChoice,searchTermObj,target){if(facetChoice.singleton===true){removeFacetChoice(searchTermObj.type,target);}else{removeOptionChoice(searchTermObj,target);}}
function removeChoice(searchTerm,src,target){execForMatchingChoice(src,searchTerm.type,removeFacetOrOption);function removeFacetOrOption(facet){removeSingleChoice(facet,searchTerm,target);}}
function removeOptionChoice(searchTermObj,target){execForMatchingChoice(target.slice().filter(hasOptions),searchTermObj.type,removeOption);function removeOption(choice){choice.options=choice.options.filter(keyNotMatch(searchTermObj.value));if(choice.options.length===0){target.splice(target.indexOf(choice),1);}
function keyNotMatch(value){return function keyNotMatchBool(option){return option.key!==value;};}}}
function getQueryObject(data){return getSearchTermsFromQueryString(data).map(getSearchTermObject).reduce(addToObject,{});function addToObject(orig,curr){orig[curr.type]=curr.value;return orig;}}}})();