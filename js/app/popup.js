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

        .state('home.run-campaign', {
            url: '/run-campaign',
            templateUrl: '../views/run-campaign.html'
        });
       
    $urlRouterProvider.otherwise('/home/insert-code');
})



myApp.controller("PopupCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.client_analytics_code = '';
    $scope.selectedObj = {};

    //change before deploying
    $scope.baseUrl = 'http://localhost:8000';

    $scope.loginViaExtension = function(formData) {
        console.log('ran $scope.loginViaExtension');
        chrome.runtime.sendMessage({type:"loginViaExtension", data: formData }, 
            function(response){
                console.log('this is the response from the background page',response)        
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

    $scope.startScraping = function(user, campaign){
        console.log('here is the search_term:', campaign.search_term);
        console.log('here is the campaign_id:', campaign.campaign_id);
        console.log('ran startScraping function with this user', user);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
             chrome.tabs.sendMessage(tabs[0].id, {type:"scrapeTime", creds: user, campaign: {campaign_id: campaign.campaign_id, search: campaign.search_term}}, function(response){
                // console.log('this is the response from content page',response)        
            });
        });    
    }

    // handling the images and descriptions sent back from content.js
    chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
                case "fell in love":
                    console.log('cool');
                    
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );

  }
]);


