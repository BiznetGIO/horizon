(function(){'use strict';angular.module('horizon.dashboard.project.workflow.launch-instance').controller('LaunchInstanceWizardController',LaunchInstanceWizardController);LaunchInstanceWizardController.$inject=['$scope','launchInstanceModel','horizon.dashboard.project.workflow.launch-instance.workflow'];function LaunchInstanceWizardController($scope,launchInstanceModel,launchInstanceWorkflow){$scope.workflow=launchInstanceWorkflow;$scope.model=launchInstanceModel;$scope.model.initialize(true);$scope.submit=$scope.model.createInstance;}})();