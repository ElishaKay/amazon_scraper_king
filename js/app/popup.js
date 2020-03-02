var myApp = angular.module("my-app", ['ui.router']);

// configuring our routes 
// =============================================================================
myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html'
        })
        
        .state('home.insert-code', {
            url: '/insert-code',
            templateUrl: '../views/insert-code.html'
        })

        .state('home.fetch-amazon-data', {
            url: '/fetch-amazon-data',
            templateUrl: '../views/fetch-amazon-data.html'
        })

        .state('home.run-campaign', {
            url: '/run-campaign',
            templateUrl: '../views/run-campaign.html'
        });
       
    $urlRouterProvider.otherwise('/home/insert-code');
})



myApp.controller("PopupCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.client = {};
    $scope.formData = {};
    $scope.client_analytics_code = '';
    $scope.selectedObj = {};

    //change before deploying
    $scope.baseUrl = 'http://localhost:8000';

    $scope.loginViaExtension = function(formData) {
        console.log('ran $scope.loginViaExtension');
        chrome.runtime.sendMessage({type:"loginViaExtension", data: formData }, 
            function(response){
                console.log('this is the response from the background page',response);
                if(response.hasOwnProperty('client_analytics_code')){
                    console.log('found client_analytics_code property');
                    $scope.client = response;
                    $state.go('home.fetch-amazon-data');
                }  
            }
        );
    };

    $scope.getClientData = function(formData) {
        console.log('heres the client form data:', formData);
        $scope.client_analytics_code = formData.client_analytics_code;

        let logIn = function(){
           $state.go('home.run-campaign');
        }
        

    };

  }
]);


myApp.controller("ScraperCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Scraper Controller Initialized");

    $scope.fetchAmazonData = function(user){
        // chrome.runtime.sendMessage({type:"scrapeTime", user: user }, 
        //     function(response){
        //         console.log('this is the response from the content page for scrapeTime Event',response);
        //     }
        // ); 

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type:"scrapeTime", user: user }, function(response){
                // console.log('this is the response from content page',response)        
            });   
        });    

    }


  }
]);