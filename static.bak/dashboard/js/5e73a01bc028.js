angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/app/core/images/panel.html","<hz-resource-panel resource-type-name=\"OS::Glance::Image\">\n  <hz-resource-table resource-type-name=\"OS::Glance::Image\"\n                     track-by=\"trackBy\"></hz-resource-table>\n</hz-resource-panel>\n");}]);