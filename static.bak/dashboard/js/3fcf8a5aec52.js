angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/framework/widgets/table/hz-detail-row.html","<!--\n  Default detail row template\n\n  May be overridden.\n\n  The responsive columns that disappear typically should reappear here\n  with the same responsive priority that they disappear.\n  E.g. table header with rsp-p2 should be here with rsp-alt-p2\n  The layout should minimize vertical space to reduce scrolling.\n-->\n<div class=\"row\">\n  <span class=\"rsp-alt-p2\">\n    <dl class=\"col-sm-2\" ng-repeat=\"column in config.columns\">\n      <dt>{$ column.title $}</dt>\n      <dd><hz-cell table=\"table\" column=\"column\" item=\"item\"></hz-cell></dd>\n    </dl>\n  </span>\n</div>\n");}]);