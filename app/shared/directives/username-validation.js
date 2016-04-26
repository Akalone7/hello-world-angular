angular.module('hsClefraApp').directive('username', function($q, $timeout, serverApiSvc) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          serverApiSvc.checkUsername(function (data) {
            if (data) {
              // The username is available
              def.reject();
            } else {
              def.resolve();
            }
          }, modelValue);
        }, 2000);

        return def.promise;
      };
    }
  };
});