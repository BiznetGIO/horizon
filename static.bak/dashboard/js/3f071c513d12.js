'use strict';;!function(undefined){var ObjectPath={parse:function(str){if(typeof str!=='string'){throw new TypeError('ObjectPath.parse must be passed a string');}
var i=0;var parts=[];var d,b,q,c;while(i<str.length){d=str.indexOf('.',i);b=str.indexOf('[',i);if(d===-1&&b===-1){parts.push(str.slice(i,str.length));i=str.length;}
else if(b===-1||(d!==-1&&d<b)){parts.push(str.slice(i,d));i=d+1;}
else{if(b>i){parts.push(str.slice(i,b));i=b;}
q=str.slice(b+1,b+2);if(q!=='"'&&q!=='\''){c=str.indexOf(']',b);if(c===-1)c=str.length;parts.push(str.slice(i+1,c));i=(str.slice(c+1,c+2)==='.')?c+2:c+1;}else{c=str.indexOf(q+']',b);if(c===-1)c=str.length;while(str.slice(c-1,c)==='\\'&&b<str.length){b++;c=str.indexOf(q+']',b);}
parts.push(str.slice(i+2,c).replace(new RegExp('\\'+q,'g'),q));i=(str.slice(c+2,c+3)==='.')?c+3:c+2;}}}
return parts;},stringify:function(arr,quote){if(!Array.isArray(arr))
arr=[arr.toString()];quote=quote==='"'?'"':'\'';return arr.map(function(n){return'['+quote+(n.toString()).replace(new RegExp(quote,'g'),'\\'+quote)+quote+']';}).join('');},normalize:function(data,quote){return ObjectPath.stringify(Array.isArray(data)?data:ObjectPath.parse(data),quote);},registerModule:function(angular){angular.module('ObjectPath',[]).provider('ObjectPath',function(){this.parse=ObjectPath.parse;this.stringify=ObjectPath.stringify;this.normalize=ObjectPath.normalize;this.$get=function(){return ObjectPath;};});}};if(typeof define==='function'&&define.amd){define(function(){return{ObjectPath:ObjectPath};});}
else if(typeof exports==='object'){exports.ObjectPath=ObjectPath;}
else{window.ObjectPath=ObjectPath;}}();