var app = angular.module('NiruApp', ['ngMaterial','ngRoute','ngAnimate','pdf']);

app.controller('HomeController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
     $mdSidenav(menuId).toggle();
  };
  
  $scope.clickClose = function(menuId){
  $mdSidenav(menuId).close();
    }
 
}]);

app.controller('ProjectsController',function($scope,$http){
   $http.get('Service/projectInfo.json').success(function(data){
   $scope.projects = data;
   localStorage.setItem('projects', JSON.stringify($scope.projects));
   }).error(function(status,data){
      console.log(status)
   });
   
   
});

app.controller('ShowProjectController',function($scope,$http,$routeParams){
$http.get('Service/projectInfo.json').success(function(data){
      $scope.projects = data;
      $scope.project = $scope.projects[$routeParams.id];
   })
   
app.controller('paintingsController',function($scope){
   $scope.paintings = "Coming Soon..";
});  
      
});


app.controller('DocCtrl', function($scope) {

  $scope.pdfName = 'Role : UI/UX Designer / Developer';
  $scope.pdfUrl = 'pdf/resume.pdf';
  $scope.scroll = 0;
  $scope.loading = 'loading';

  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  }

  $scope.onError = function(error) {
    console.log(error);
  }

  $scope.onLoad = function() {
    $scope.loading = '';
  }

  $scope.onProgress = function(progress) {
    console.log(progress);
  }

});

app.config(function($routeProvider){
$routeProvider
.when('/',{
      templateUrl:'Partials/home.html',
	 
})
.when('/About',{
      templateUrl:'Partials/about.html',
	  controller:'AboutController'
})
.when('/Projects',{
      templateUrl:'Partials/projects.html',
	  controller:'ProjectsController'
})
.when('/Resume',{
      templateUrl:'Partials/resume.html',
	  controller:'DocCtrl'
})
.when('/Contact',{
      templateUrl:'Partials/contact.html',
	  controller:'ContactController'
})
.when('/showproject/:id',{
      templateUrl:'Partials/showproject.html',
	  controller:'ShowProjectController'
})
.otherwise({redirectTo:'/'})
});