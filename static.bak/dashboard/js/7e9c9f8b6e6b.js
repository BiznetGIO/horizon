angular.module('horizon.app').run(['$templateCache',function($templateCache){$templateCache.put("/static/auth/login/login.regular.mock.html","<form>\n  <p class=\"help_text\">Some help text.</p>\n  <fieldset hz-login-finder>\n    <div class=\"form-group\"><input id=\"id_username\"></div>\n    <div class=\"form-group\"><input id=\"id_password\"></div>\n  </fieldset>\n</form>\n");}]);