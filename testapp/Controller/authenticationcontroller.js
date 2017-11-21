function AuthController($scope, $log, domain, AuthService) {
    $scope.user = {
        username: '', password: ''
    };
    $scope.message = "";
    $scope.login = function() {
        AuthService.login($scope.user)
        .then(function(data){
            $log.log('controller');
            $log.log(data)
            if(data.status === 422) {
                $scope.message = "Incorrect username or password";
            }
        });
    }
}