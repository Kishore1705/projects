function RegisterController($log, $scope, RegisterService, $state) {
    $scope.user = {
        username: '',
        password: '',
        first_name: '',
        last_name: ''
    }

    $scope.register = function() {
        $log.log($scope.user);
        RegisterService.register($scope.user)
        .then(function(data){
            $log.log(data);
        });
    }
}