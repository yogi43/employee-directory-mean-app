var myApp = angular.module('EmployeeApp', []);
myApp.controller('EmployeeCtrl', ['$scope', '$http', function($scope, $http) {

  var updateView=function(){
         $http.get('/employee').success(function(response) {
	         $scope.employees = response;
	         $scope.employee="";
        });
  };

  updateView();

    $scope.addEmployee = function() {
    	var data = $scope.employee;
    	$scope.employee = {
    			"Name" : data.Name,
    			"Email": data.Email,
    			"Date_of_birth": data.Date_of_birth,
    			"Department": data.Department,
    			"Gender": data.Gender,
    			"Age": Math.floor((new Date() - new Date(data.Date_of_birth))/(365*24*60*60*1000))
    	};
      $http.post('/employee', $scope.employee).success(function(response) {
        updateView();
      });
    };

    $scope.removeEmployee = function(id) {
      $http.delete('/employee/' + id).success(function(response) {
          updateView();
      });
    };

    $scope.editEmployee = function(id) {
      $http.get('/employee/' + id).success(function(response) {
      $scope.employee = response;
     });
   };

    $scope.updateEmployee = function() {
    	var data = $scope.employee;
    	$scope.employee = {
    			"_id" : data._id,
    			"Name" : data.Name,
    			"Email": data.Email,
    			"Date_of_birth": data.Date_of_birth,
    			"Department": data.Department,
    			"Gender": data.Gender,
    			"Age": Math.floor((new Date() - new Date(data.Date_of_birth))/(365*24*60*60*1000))
    	};
     $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function(response) {
       updateView();
     });
    };


}]);
