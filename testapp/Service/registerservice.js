function RegisterService($log, $http, $q, $state, HttpService, AuthService) {
    return {
        register: function(user) {
            var defered = $q.defer();
            HttpService.post('user/register', user)
            .then(function(data){  
                if(data.data.status === 200) {
                    $state.go('login');
                }else {
                    defered.resolve(data);
                }
            });
            return defered.promise;
        }
    }
}