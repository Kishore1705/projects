function DashboardController($log,$scope,DashboardService, $state, HttpService) {
    $scope.todaytask = [];
    $scope.message = "";
    $scope.headline = "Create Task";
    $scope.row_index;
    $scope.taskstatus = ["New", "Started", "Completed"];
    $scope.selectedItem;
    $scope.username = localStorage.getItem('username');
    
    DashboardService.getTodaysTask()
    .then(function(data) {
        $log.log(data.data)
        $scope.todaytask = data.data;
    });

    $scope.task = {
        name: '',
        objective: '',
        status: '',
        startdate: '',
        starttime: '',
        enddate: '',
        endtime: ''
    };

    $scope.alertFade =  function(type) {
        if(type === 'success'){
            $scope.isSuccess = true;
            $("#successAlert").fadeIn(3000);
            $("#successAlert").fadeOut(3000);
        }else {
            $scope.isError = true;
            $("#failureAlert").fadeIn(3000);
            $("#failureAlert").fadeOut(3000);
        }
    }

    $scope.onModalClick = function(type) {
        if(type == "create"){
            $scope.headline = "Create Task";
            $scope.today();
        }else{
            $scope.headline = "Update Task";
        }
        $('#createmodal').modal('show', {backdrop: 'static', keyboard: false});
    }

    $scope.onStatusChange = function(event) {
        $log.log(event)
        $scope.task.status = event;
    }

    $scope.onButtonClick = function(updateData, index) {   
        $scope.selectedItem = updateData.status;  
        $scope.row_index = index;
        $scope.task['taskid'] = updateData.taskid;
        for(var key in $scope.task){
            if ($scope.task.hasOwnProperty(key)) {
               switch (key) {
                   case 'startdate':
                       var from = updateData[key].split("/");
                       $scope.task[key] = new Date(from[2], from[1] - 1, from[0]);
                       break;
                    case 'enddate':
                        var from = updateData[key].split("/");
                        $scope.task[key] = new Date(from[2], from[1] - 1, from[0]);                     
                       break;
                   default:
                        $scope.task[key] = updateData[key];
                       break;
               }
            }
        }
        DashboardService.updateTime(updateData.starttime)
        .then(function(data){
            $scope.mytime = data;
            $log.log(updateData.endtime)
            DashboardService.updateTime(updateData.endtime)
            .then(function(data){
                $log.log(data);
                $scope.endtime = data;
                $('#createButton').click();
            });
        });
    }

    $scope.logout = function() {
        localStorage.removeItem('auth_token');
        $state.go('login');
    }

    /*Create Task */
    $scope.create = function() {   
        dataValidation();
    }    

    /**Delete */
    $scope.delete = function(id, index) {
        $scope.deleteTask = function() {
            HttpService.delete('task?id='+id)
            .then(function(data){
                if(data.data){
                    $scope.information = "Task moved to trash!!!";
                    $scope.alertFade('success');
                    $scope.todaytask.splice(index,1);
                }else {
                    $scope.information = "Something went wrong!!!";
                }
            }); 
        }
    }

    //Data Validation
    function dataValidation(){
        $scope.task.startdate = new Date($scope.task.startdate);
        $scope.task.enddate = new Date($scope.task.enddate);
        DashboardService.compareDate($scope.task.startdate, $scope.task.enddate)
        .then(function(data){
            if(data) {   
                $scope.message = "";            
                DashboardService.compareTime($scope.mytime, $scope.endtime)
                .then(function(data){
                    if(data) { 
                        $scope.message = "";
                        if($scope.message == "") {
                            DashboardService.convertDate($scope.task.startdate)
                            .then(function(data){
                                $scope.task.startdate = data;
                                DashboardService.convertDate($scope.task.enddate)
                                .then(function(data){
                                    $scope.task.enddate = data;
                                    DashboardService.convertTime($scope.mytime, $scope.endtime)
                                    .then(function(data){
                                        $scope.task.starttime = data.startTime;
                                        $scope.task.endtime = data.endTime;
                                        $log.log($scope.task);
                                        if($scope.headline === "Create Task"){
                                            HttpService.post('task', $scope.task)
                                            .then(function(data){
                                                $log.log(data.data);
                                                if(data.data.status === 200){
                                                    $scope.information = "Task Created!!!";
                                                    $scope.alertFade('success');
                                                    $scope.todaytask.push(data.data.tasks);
                                                    $('#closeButton').click();
                                                    $scope.reset();
                                                }else{
                                                    $scope.information = "Failed to create task!!!";
                                                    $scope.alertFade('');
                                                }
                                            });
                                        }else {                                            
                                            $log.log("update")
                                            $log.log($scope.task);
                                            HttpService.put('task', $scope.task)
                                            .then(function(data){
                                                $log.log(data.data);
                                                if(data.data.status === 200){
                                                    $scope.information = "Task Updated!!!";
                                                    $scope.alertFade('success');
                                                    $scope.todaytask[$scope.row_index]=data.data.tasks;
                                                    $('#closeButton').click();
                                                    $scope.reset();
                                                }else{
                                                    $scope.information = "Failed to update task!!!";
                                                    $scope.alertFade('');
                                                }
                                            });
                                        }
                                    });
                                });
                            });
                        }
                    }else {
                        $scope.message = "Start time should be less than end time";
                    }
                });
            }else {
                $scope.message = "Start date should be less than end date";
            }
        });
    }

    /**Form reset */
    $scope.reset = function() {
        $scope.selectedItem = "";
        for (var key in $scope.task) {
            if ($scope.task.hasOwnProperty(key)) {
                $scope.task[key] = "";
            }
        }
    }

    /*Date Picker*/
    $scope.today = function() {
    $scope.task.startdate = new Date();
    $scope.task.enddate = new Date();
    };
    $scope.today();

    $scope.clear = function () {
    $scope.task.startdate = null;
    $scope.task.enddate = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event, datetype) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
    if(datetype == 'startdate'){
        $scope.startdateopened = true;
        $scope.enddateopened = false;
    }
    else if(datetype == 'enddate'){
        $scope.startdateopened = false;
        $scope.enddateopened = true;
    }
    };

    $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
    };

    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    /*Time Picker*/
    $scope.mytime = new Date();
    $scope.endtime = new Date();
    
      $scope.hstep = 1;
      $scope.mstep = 15;
    
      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };
    
      $scope.ismeridian = false;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };
    
      $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
        $scope.endtime = d;
      };
    
      $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.mytime);
        DashboardService.compareTime($scope.mytime, $scope.endtime)
        .then(function(data){
            if(data) {
                $scope.message = "";
            }else{
                $scope.message = "Start time should less than end time";
            }
        });
      };

      $scope.endchanged = function () {
        $log.log('Time changed to: ' + $scope.endtime);
        DashboardService.compareTime($scope.mytime, $scope.endtime)
        .then(function(data){
            if(data) {
                $scope.message = "";
            }else{
                $scope.message = "Start time should less than end time";
            }
        });        
      };
    
      $scope.clear = function() {
        $scope.mytime = null;
        $scope.endtime = null;
      };
}