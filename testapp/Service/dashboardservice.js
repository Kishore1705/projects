function DashboardService($log, $q, $http, domain, HttpService) {
    return {
        createTask: function(taskObject) {
            var created = $q.defer();
            HttpService.post('task', taskObject)
            .then(function(data){
                if(data.data.status === 200){
                    created.resolve(data.data);
                }else{
                    $log.log('else entered');
                    created.resolve(data.data);
                }
            });
            return created.promise;
        },
        getTodaysTask: function() {
            var defered = $q.defer();
            var today = new Date();
            var dd = today.getDate();            
            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 
            
            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = dd+'/'+mm+'/'+yyyy;
            HttpService.get('task/today?enddate='+today)
            .then(function(data){
                defered.resolve(data);
            });
            return defered.promise;
        },
        convertDate: function(date) {
            var defered = $q.defer();
            var today = date;
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            } 
            if(mm<10){
                mm='0'+mm;
            } 
            var today = dd+'/'+mm+'/'+yyyy;
            defered.resolve(today);
            //$log.log(today)
            return defered.promise;
        },
        compareTime: function(start, end) {
            var defered = $q.defer();
            var st = start.getHours();
            var et = end.getHours();

            var sm = start.getMinutes();
            var em = end.getMinutes();


            var sd = start.getDate();
            var ed = end.getDate();


            if(sd == ed){
                if(st == et && em <= sm){
                    defered.resolve(false);
                }else if(st > et) {
                    defered.resolve(false);
                }
            } 
            defered.resolve(true);
            return defered.promise;
        },
        compareDate: function(start, end) {
            var defered = $q.defer();
            var sd = start;
            var ed = end;
            if(sd.getDate() > ed.getDate()) {
                defered.resolve(false);
            }
            defered.resolve(true);
            return defered.promise;
        },
        convertTime: function(start, end) {
            var defered = $q.defer();
            var obj = {
                startTime: '',
                endTime: ''
            }
            if(start.getHours() >= 12){
                obj.startTime = start.getHours()+':'+start.getMinutes()+' PM'
            }else{
                obj.startTime = start.getHours()+':'+start.getMinutes()+' AM'
            }
            if(end.getHours() >= 12){
                obj.endTime = end.getHours()+':'+end.getMinutes()+' PM'
            }else{
                obj.endTime = end.getHours()+':'+end.getMinutes()+' AM'
            }
            defered.resolve(obj);
            return defered.promise;
        },
        updateTime: function(time) {
            var defered = $q.defer();
            var d = new Date();
            var str;
            if(time.search("PM") != -1)
            {
                str = time.replace("PM", "");
            }
            if(time.search("AM") != -1)
            {
                str = time.replace("AM", "");
            }
            d.setHours( str.substring(0,2) );
            d.setMinutes( str.substring(3) );
            defered.resolve(d)
            return defered.promise;
        }
    }
}
