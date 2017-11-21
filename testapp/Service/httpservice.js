function HttpService($http,$q,$log, domain) {
    return {
        get: function(url) {
            var defered = $q.defer();
            $http({
                method: 'GET',
                url : domain+url
            })
            .then(function successCallback(success){
                defered.resolve(success);
            }, function errorCallback(err){
                defered.resolve(err);
            });
            return defered.promise;
        },
        post: function(url, body) {
            var defered = $q.defer();
            $http({
                method: 'POST',
                url : domain+url,
                data: JSON.stringify(body)
            })
            .then(function successCallback(success){
                defered.resolve(success);
            }, function errorCallback(err){
                defered.resolve(err);
            });
            return defered.promise;
        },
        put: function(url,body) {
            var defered = $q.defer();
            $http({
                method: 'PUT',
                url : domain+url,
                data: JSON.stringify(body)
            })
            .then(function successCallback(success){
                defered.resolve(success);
            }, function errorCallback(err){
                defered.resolve(err);
            });
            return defered.promise;
        },
        delete: function(url) {
            var defered = $q.defer();
            $http({
                method: 'DELETE',
                url : domain+url
            })
            .then(function successCallback(success){
                defered.resolve(success);
            }, function errorCallback(err){
                defered.resolve(err);
            });
            return defered.promise;
        }
    }
}