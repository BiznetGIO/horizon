angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/dashboard/project/containers/create-folder-modal.html","<div class=\"modal-header\">\n  <button type=\"button\" class=\"close\" ng-click=\"$dismiss()\" aria-hidden=\"true\" aria-label=\"Close\">\n    <span aria-hidden=\"true\" class=\"fa fa-times\"></span>\n  </button>\n  <div class=\"h3 modal-title\">\n    <translate>Create Folder In: {$ ctrl.model.container.name $}</translate>\n    <span ng-if=\"ctrl.model.folder\">: {$ ctrl.model.folder $}</span>\n  </div>\n</div>\n\n<div ng-form=\"uploadForm\">\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-sm-6\">\n        <fieldset>\n          <div class=\"form-group required\">\n            <label class=\"control-label required\" for=\"id_name\" translate>Folder Name</label>\n            <div>\n              <input class=\"form-control\" id=\"id_name\" maxlength=\"255\" autofocus required\n                     name=\"name\" ng-model=\"ctrl.model.name\" type=\"text\">\n            </div>\n          </div>\n        </fieldset>\n      </div>\n\n      <div class=\"col-sm-6\">\n        <p translate>\n          Note: Delimiters (\'{$ ctrl.model.DELIMETER $}\') are allowed in the\n          folder name to create deep folders.\n        </p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"modal-footer\">\n    <button class=\"btn btn-default\" ng-click=\"$dismiss()\">\n      <span class=\"fa fa-close\"></span>\n      <translate>Cancel</translate>\n    </button>\n    <button class=\"btn btn-primary\"\n           ng-disabled=\"uploadForm.$invalid || uploadForm.$pristine\"\n           ng-click=\"$close(ctrl.model.name)\">\n      <span class=\"fa fa-plus\"></span>\n      <translate>Create Folder</translate>\n    </button>\n  </div>\n</div>\n");}]);