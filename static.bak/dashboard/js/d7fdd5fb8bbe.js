angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/dashboard/project/workflow/launch-instance/flavor/flavor.html","<!--\n   (c) Copyright 2015 Hewlett-Packard Development Company, L.P.\nLicensed under the Apache License, Version 2.0 (the \"License\");\nyou may not use this file except in compliance with the License.\nYou may obtain a copy of the License at\n\n   http://www.apache.org/licenses/LICENSE-2.0\n\nUnless required by applicable law or agreed to in writing, software\ndistributed under the License is distributed on an \"AS IS\" BASIS,\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\nSee the License for the specific language governing permissions and\nlimitations under the License.\n-->\n<div ng-controller=\"LaunchInstanceFlavorController as selectFlavorCtrl\">\n  <p class=\"step-description\" translate>\n    Flavors manage the sizing for the compute, memory and storage capacity of the instance.\n  </p>\n  <transfer-table\n      tr-model=\"selectFlavorCtrl.transferTableModel\"\n      limits=\"selectFlavorCtrl.allocationLimits\">\n    <allocated ng-model=\"selectFlavorCtrl.allocatedFlavorFacades.length\"\n      validate-number-min=\"1\" name=\"allocated-flavor\">\n  <table st-magic-search st-table=\"selectFlavorCtrl.displayedAllocatedFlavorFacades\"\n         st-safe-src=\"selectFlavorCtrl.allocatedFlavorFacades\"\n         hz-table class=\"table table-striped table-rsp table-detail\">\n    <thead>\n      <tr>\n        <th class=\"expander\"></th>\n        <th st-sort=\"name\" class=\"rsp-p1\" translate>Name</th>\n        <th st-sort=\"vcpus\" class=\"rsp-p1\" translate>VCPUS</th>\n        <th st-sort=\"ram\" class=\"rsp-p1\" translate>RAM</th>\n        <th st-sort=\"totalDisk\" class=\"rsp-p1\" translate>Total Disk</th>\n        <th st-sort=\"rootDisk\" class=\"rsp-p2\" translate>Root Disk</th>\n        <th st-sort=\"ephemeralDisk\" class=\"rsp-p2\" translate>Ephemeral Disk</th>\n        <th st-sort=\"isPublic\" class=\"rsp-p1\" translate>Public</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-if=\"selectFlavorCtrl.displayedAllocatedFlavorFacades.length === 0\">\n        <td colspan=\"10\">\n          <div class=\"no-rows-help\">\n            {$ ::trCtrl.helpText.noneAllocText $}\n          </div>\n        </td>\n      </tr>\n      <tr ng-repeat-start=\"item in selectFlavorCtrl.displayedAllocatedFlavorFacades track by item.id\">\n        <td class=\"expander\">\n          <span class=\"fa fa-chevron-right\" hz-expand-detail\n                title=\"{$ ::expandDetailsText $}\"></span>\n        </td>\n        <td class=\"rsp-p1 word-break\">{$ ::item.name $}</td>\n        <td class=\"rsp-p1\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n          ng-show=\"item.errors.vcpus\"\n          popover=\"{$ item.errors.vcpus $}\"\n          popover-placement=\"top\" popover-append-to-body=\"true\"\n          popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.vcpus $}\n        </td>\n        <td class=\"rsp-p1\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n            ng-show=\"item.errors.ram\"\n            popover=\"{$ item.errors.ram $}\"\n            popover-placement=\"top\" popover-append-to-body=\"true\"\n            popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.ram | mb $}\n        </td>\n        <td class=\"rsp-p1\">{$ ::item.totalDisk | gb $}</td>\n        <td class=\"rsp-p2\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n            ng-show=\"item.errors.disk\"\n            popover=\"{$ item.errors.disk $}\"\n            popover-placement=\"top\" popover-append-to-body=\"true\"\n            popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.rootDisk | gb $}\n        </td>\n        <td class=\"rsp-p2\">{$ ::item.ephemeralDisk | gb $}</td>\n        <td class=\"rsp-p1\">{$ ::item.isPublic | yesno $}</td>\n        <td class=\"action-col\">\n          <action-list button-tooltip=\"item.disabledMessage\"\n              bt-model=\"tooltipModel\"\n              bt-disabled=\"!isAvailableTable || item.enabled\"\n              warning-classes=\"\'invalid\'\">\n            <notifications>\n              <span class=\"fa fa-exclamation-triangle invalid\"\n                ng-show=\"isAvailableTable && !item.enabled\"></span>\n            </notifications>\n            <action action-classes=\"\'btn btn-sm btn-default\'\"\n                    callback=\"trCtrl.deallocate\"\n                    item=\"item\"\n                    disabled=\"isAvailableTable && !item.enabled\">\n              <span class=\"fa fa-arrow-down\"></span>\n            </action>\n          </action-list>\n        </td>\n      </tr>\n      <tr ng-repeat-end class=\"detail-row\">\n        <td colspan=\"9\" class=\"detail\">\n          <span class=\"h5\" translate>Impact on your quota</span>\n          <div class=\"row\">\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.instancesChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.vcpusChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.ramChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n          </div>\n          <div class=\"row\" ng-if=\"selectFlavorCtrl.cinderLimits\">\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.volumeChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.volumeStorageChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n          </div>\n          <div ng-if=\"selectFlavorCtrl.metadataDefs.flavor\">\n            <div class=\"row\" ng-if=\"item.extras\">\n              <div class=\"col-sm-12\">\n                <metadata-display\n                  available=\"::selectFlavorCtrl.metadataDefs.flavor\"\n                  existing=\"::item.extras\">\n                </metadata-display>\n              </div>\n            </div>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n    </allocated>\n    <available>\n<hz-magic-search-context filter-facets=\"selectFlavorCtrl.filterFacets\">\n  <hz-magic-search-bar>\n  </hz-magic-search-bar>\n  <table st-magic-search st-table=\"selectFlavorCtrl.displayedAvailableFlavorFacades\"\n         st-safe-src=\"selectFlavorCtrl.availableFlavorFacades\"\n         hz-table class=\"table table-striped table-rsp table-detail\">\n    <thead>\n      <tr>\n        <th class=\"expander\"></th>\n        <th st-sort=\"name\" class=\"rsp-p1\" translate>Name</th>\n        <th st-sort=\"vcpus\" class=\"rsp-p1\" translate>VCPUS</th>\n        <th st-sort-default st-sort=\"ram\" class=\"rsp-p1\" translate>RAM</th>\n        <th st-sort=\"totalDisk\" class=\"rsp-p1\" translate>Total Disk</th>\n        <th st-sort=\"rootDisk\" class=\"rsp-p2\" translate>Root Disk</th>\n        <th st-sort=\"ephemeralDisk\" class=\"rsp-p2\" translate>Ephemeral Disk</th>\n        <th st-sort=\"isPublic\" class=\"rsp-p1\" translate>Public</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-if=\"selectFlavorCtrl.displayedAvailableFlavorFacades.length === 0\">\n        <td colspan=\"10\">\n          <div class=\"no-rows-help\">\n            {$ ::trCtrl.helpText.noneAvailText $}\n          </div>\n        </td>\n      </tr>\n      <tr ng-repeat-start=\"item in selectFlavorCtrl.displayedAvailableFlavorFacades track by item.id\" ng-if=\"!trCtrl.allocatedIds[item.id]\">\n        <td class=\"expander\">\n          <span class=\"fa fa-chevron-right\" hz-expand-detail\n                title=\"{$ ::expandDetailsText $}\"></span>\n        </td>\n        <td class=\"rsp-p1 word-break\">{$ ::item.name $}</td>\n        <td class=\"rsp-p1\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n          ng-show=\"item.errors.vcpus\"\n          popover=\"{$ item.errors.vcpus $}\"\n          popover-placement=\"top\" popover-append-to-body=\"true\"\n          popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.vcpus $}\n        </td>\n        <td class=\"rsp-p1\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n            ng-show=\"item.errors.ram\"\n            popover=\"{$ item.errors.ram $}\"\n            popover-placement=\"top\" popover-append-to-body=\"true\"\n            popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.ram | mb $}\n        </td>\n        <td class=\"rsp-p1\">{$ ::item.totalDisk | gb $}</td>\n        <td class=\"rsp-p2\">\n          <span class=\"invalid fa fa-exclamation-triangle\"\n            ng-show=\"item.errors.disk\"\n            popover=\"{$ item.errors.disk $}\"\n            popover-placement=\"top\" popover-append-to-body=\"true\"\n            popover-trigger=\"mouseenter mouseleave\"/>\n          {$ ::item.rootDisk | gb $}\n        </td>\n        <td class=\"rsp-p2\">{$ ::item.ephemeralDisk | gb $}</td>\n        <td class=\"rsp-p1\">{$ ::item.isPublic | yesno $}</td>\n        <td class=\"action-col\">\n          <action-list button-tooltip=\"item.disabledMessage\"\n              bt-model=\"tooltipModel\"\n              bt-disabled=\"!isAvailableTable || item.enabled\"\n              warning-classes=\"\'invalid\'\">\n            <notifications>\n              <span class=\"fa fa-exclamation-triangle invalid\"\n                ng-show=\"isAvailableTable && !item.enabled\"></span>\n            </notifications>\n            <action action-classes=\"\'btn btn-sm btn-default\'\"\n                    callback=\"trCtrl.allocate\"\n                    item=\"item\"\n                    disabled=\"isAvailableTable && !item.enabled\">\n              <span class=\"fa fa-arrow-up\"></span>\n            </action>\n          </action-list>\n        </td>\n      </tr>\n      <tr ng-repeat-end class=\"detail-row\" ng-if=\"!trCtrl.allocatedIds[item.id]\">\n        <td colspan=\"9\" class=\"detail\">\n          <span class=\"h5\" translate>Impact on your quota</span>\n          <div class=\"row\">\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.instancesChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.vcpusChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.ramChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n          </div>\n          <div class=\"row\" ng-if=\"selectFlavorCtrl.cinderLimits\">\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.volumeChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n            <div class=\"col-xs-4\">\n              <pie-chart chart-data=\"item.volumeStorageChartData\"\n                         chart-settings=\"chartSettings\"></pie-chart>\n            </div>\n          </div>\n          <div ng-if=\"selectFlavorCtrl.metadataDefs.flavor\">\n            <div class=\"row\" ng-if=\"item.extras\">\n              <div class=\"col-sm-12\">\n                <metadata-display\n                  available=\"::selectFlavorCtrl.metadataDefs.flavor\"\n                  existing=\"::item.extras\">\n                </metadata-display>\n              </div>\n            </div>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</hz-magic-search-context>\n    </available>\n  </transfer-table>\n</div>\n");}]);