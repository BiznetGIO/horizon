(function(){'use strict';angular.module('horizon.framework.widgets.metadata.tree',[],config).constant('horizon.framework.widgets.metadata.tree.defaults',{text:{help:gettext('You can specify resource metadata by moving items from the left column to the right column. In the left column there are metadata definitions from the Glance Metadata Catalog. Use the "Custom" option to add metadata with the key of your choice.'),item_help:gettext('Click each item to get its description here.'),min:gettext('Min'),max:gettext('Max'),minLength:gettext('Min length'),maxLength:gettext('Max length'),patternMismatch:gettext('Pattern mismatch'),integerRequired:gettext('Integer required'),decimalRequired:gettext('Decimal required'),required:gettext('Required'),duplicate:gettext('Duplicate keys are not allowed'),filter:gettext('Filter'),available:gettext('Available Metadata'),existing:gettext('Existing Metadata'),custom:gettext('Custom'),noAvailable:gettext('No available metadata'),noExisting:gettext('No existing metadata')}});config.$inject=['$provide','$windowProvider'];function config($provide,$windowProvider){var path=$windowProvider.$get().STATIC_URL+'framework/widgets/metadata/tree/';$provide.constant('horizon.framework.widgets.metadata.tree.basePath',path);}})();