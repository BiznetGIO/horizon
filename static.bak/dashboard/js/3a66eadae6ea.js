angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/app/core/images/details/drawer.html","<div ng-controller=\"horizon.app.core.images.DrawerController as drawerCtrl\">\n\n  <hz-resource-property-list\n    resource-type-name=\"OS::Glance::Image\"\n    item=\"item\"\n    property-groups=\"[\n      [\'name\', \'id\'],\n      [\'visibility\', \'protected\'],\n      [\'disk_format\', \'size\'],\n      [\'min_disk\', \'min_ram\']]\">\n  </hz-resource-property-list>\n\n  <div class=\"row\" ng-if=\"drawerCtrl.metadataDefs\">\n    <div class=\"col-sm-12\">\n      <metadata-display\n        available=\"::drawerCtrl.metadataDefs\"\n        existing=\"item.properties || item\">\n      </metadata-display>\n    </div>\n  </div>\n</div>\n");}]);