angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/framework/widgets/form/fields/checkboxes.html","<div sf-field-model=\"sf-new-array\"\n     sf-new-array\n     class=\"hz-checkboxes form-group {$::form.htmlClass$}\"\n     ng-class=\"{\'has-error\': form.disableErrorState !== true &&  hasError(), \'has-success\': form.disableSuccessState !== true &&  hasSuccess()}\">\n  <label class=\"control-label {$::form.labelHtmlClass$}\"\n         sf-field-model\n         schema-validate=\"form\"\n         ng-show=\"showTitle()\">{$::form.title$}</label>\n\n  <div class=\"checkbox\" ng-repeat=\"val in titleMapValues track by $index\" >\n    <label>\n      <input type=\"checkbox\"\n             ng-disabled=\"form.readonly\"\n             sf-changed=\"form\"\n             class=\"{$::form.fieldHtmlClass$}\"\n             ng-model=\"titleMapValues[$index]\"\n             name=\"{$::form.key.slice(-1)[0]$}\">\n      <span ng-bind-html=\"form.titleMap[$index].name\"></span>\n    </label>\n  </div>\n  <div class=\"help-block\" sf-message=\"form.description\"></div>\n</div>\n");}]);