angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/framework/widgets/transfer-table/transfer-table.clone.mock.html","<transfer-table tr-model=\"tableData\" clone-content>\n  <table st-table=\"$displayItems\" st-safe-src=\"$sourceItems\">\n    <tr>\n      <th>ID</th>\n      <th>Animal</th>\n      <th>Action</th>\n    </tr>\n    <tr ng-repeat=\"item in $displayedItems\"\n        ng-if=\"$isAllocatedTable || ($isAvailableTable && !trCtrl.allocatedIds[item.id])\">\n      <td>{$ item.id $}</td>\n      <td>{$ item.animal $}</td>\n      <td>\n        <action-list>\n          <action ng-if=\"$isAllocatedTable\" callback=\"trCtrl.deallocate\" item=\"item\">-</action>\n          <action ng-if=\"$isAvailableTable\" callback=\"trCtrl.allocate\" item=\"item\">+</action>\n        </action-list>\n      </td>\n    </tr>\n  </table>\n</transfer-table>");}]);