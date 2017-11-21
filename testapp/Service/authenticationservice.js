function AuthService(HttpService,$q,$log, $state) {
    return {
        login: function(user) {
            var defered = $q.defer();
            HttpService.post('user/login', user)
            .then(function(data){
                if(data.data.status === 200){
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('auth_token', JSON.stringify(data.data.auth_token));
                    $state.go('dashboard');
                    defered.resolve(data.data);
                }else{
                    $log.log('else entered');
                    defered.resolve(data.data);
                }
            });
            return defered.promise;
        },
        getAuthStatus: function() {
            if(localStorage.getItem('auth_token') === null || localStorage.getItem('auth_token') === undefined){
                return false;
            }
            return true;
        }
    }
}