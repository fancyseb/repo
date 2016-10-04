var app=angular.module('myApp',['ngRoute']);
app.config(function($routeProvider){
$routeProvider.
when('/login',{
	templateUrl:"partials/login.html",
	controller:"loginControl"
}).
when('/register',{
	templateUrl:"partials/register.html",
	controller:"loginControl"
}).
when('/welcome',{
	templateUrl:"partials/welcome.html",
	controller:"welcomeControl"
}).otherwise({
    redirectTo:'/login'
  })
});
/*FACTORY*/
app.factory('factoryList',function(){
	var list=[{username:'mat',passcode:'mat'},{username:'pat',passcode:'pat'}];
    return list;
});
/*SERVICE*/
app.service('serviceList',function(factoryList){
	var userFirstname;
	this.setWelcomeUser=function(input){
		userFirstname=input;
	/*	return userFirstname;*/
	}
	this.getuser=function(){
		return userFirstname;
	}
	this.newuser=function(name,pass){
		factoryList.push({username:name,passcode:pass});
	}

});

app.controller('loginControl', ['$scope','factoryList','serviceList','$location', function($scope,factoryList,serviceList,$location) {
  $scope.login=function(){
  console.log(factoryList);
		var flag=0; 
		angular.forEach(factoryList,function(value,key){
	    if(value.username==$scope.username && value.passcode==$scope.password){
			console.log(value);
             flag=1;
	      serviceList.setWelcomeUser($scope.username);

	      $location.path("/welcome");
	    }
		});
		if(flag==0){
		 alert("Please register to continue")
		 $location.path("/register");
		}
    }
	$scope.register=function(){
	     serviceList.newuser($scope.username,$scope.password); 
	     alert("Please Login now!")	
	     $location.path("/login");
	}
}]);
	
// }]);/*loginController ends*/

app.controller('welcomeControl', ['$scope','factoryList','serviceList','$location', function($scope,factoryList,serviceList,$location) {
	 $scope.userFirstname=serviceList.getuser();
	$scope.logout=function(){
     $location.path("/login");
	}
	$scope.$watch('watch',function(newvalue,oldvalue){
    if(newvalue!=oldvalue){
    	$scope.watchContent=newvalue;
    }
	});//*watch ends
}]);
 app.provider('greeting', function() {
  var text="Welcome";
  this.$get = function() {
    return{
    	hello: function(name) {
    return (text + name);
    }
    }
  };
});
app.run(function(greeting) {  
 alert(greeting.hello(' To AngularApp'));

});