var myApp = angular.module("my-app", ['ui.router']);

// configuring our routes 
// =============================================================================
myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '../views/home.html'
        })

        .state('home.login', {
            url: '/login',
            templateUrl: '../views/login.html'
        })

        .state('home.choose-method', {
            url: '/choose-method',
            templateUrl: '../views/choose-method.html'
        })

        .state('home.fetch-search-results', {
            url: '/fetch-search-results',
            templateUrl: '../views/fetch-search-results.html'
        })

        .state('home.fetch-my-history', {
            url: '/fetch-my-history',
            templateUrl: '../views/fetch-my-history.html'
        })

        .state('home.export-my-data', {
            url: '/export-my-data',
            templateUrl: '../views/export-my-data.html'
        })

        .state('home.dance-time', {
            url: '/dance-time',
            templateUrl: '../views/dance-time.html'
        })

        .state('home.fetching-complete', {
            url: '/fetching-complete',
            templateUrl: '../views/fetching-complete.html'
        });
       
    $urlRouterProvider.otherwise('/home/login');
})

myApp.controller("PopupCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Controller Initialized");

    // we will store all of our form data in this object
    $scope.client = {};
    $scope.formData = {};
    $scope.client_analytics_code = '';
    $scope.errorMessage = '';
    $scope.error = false;
    $scope.name = '';
    //change before deploying
    $scope.baseUrl = 'http://localhost:8000';

    $scope.onPopupInit = function(formData) {
        console.log('ran $scope.onPopupInit function');
        chrome.runtime.sendMessage({type:"onPopupInit"}, 
            function(response){
                console.log('this is the response from the background page for onPopupInit message',response);
                if(response.user){
                    $scope.name = response.user.name;
                    $state.go('home.choose-method');
                }       
            }
        );
    };

    $scope.onPopupInit();

    $scope.loginViaExtension = function(formData) {
        console.log('ran $scope.loginViaExtension');
        chrome.runtime.sendMessage({type:"loginViaExtension", data: formData }, 
            function(response){
                console.log('this is the response from the background page',response);
                if(response.error){
                    let theErrorMessage = response.data.responseJSON.error;
                    console.log('theErrorMessage:',theErrorMessage);
                    $scope.errorMessage = theErrorMessage;
                    $scope.error = true;                   
                } else {
                    $scope.client = response;
                    $state.go('home.choose-method');
                }
            }
        );
    };
  }
]);


myApp.controller("ScraperCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Scraper Controller Initialized");

    //choose method
    $scope.fetchSearchResults = function(user){
        $state.go('home.fetch-search-results');
        _gaq.push(['_trackEvent', 'Clicks', 'Clicked Gather Search Results', 'from Homepage']);
    }

    $scope.fetchMyHistory = function(user){
        $state.go('home.fetch-my-history');
        _gaq.push(['_trackEvent', 'Clicks', 'Clicked Gather My History', 'from Homepage'])
    }

    $scope.exportMyData = function(user){
        $state.go('home.export-my-data');
    }

    //scrape search results
    $scope.initiateSearchScraping = function(){
        _gaq.push(['_trackEvent', 'Actions', 'Initialized Gather Results of Current Search', 'from Gather Search Results View']);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            console.log('tabs', tabs);
            chrome.runtime.sendMessage({type:"initiateSearchScraping", search_url: tabs[0].url }, 
                function(response){
                    console.log('this is the response from the content page for the initiateSearchScraping Event',response); 
                    if(response.error){
                        let theErrorMessage = response.data.responseJSON.error;
                        console.log('theErrorMessage:',theErrorMessage);
                        $scope.errorMessage = theErrorMessage;
                        $scope.error = true;  
                    } else {
                         $state.go('home.dance-time');
                    }
                }
            ); 
        });  
    }

    $scope.initiateSearchKeywordsScraping = function(search_keywords){
        console.log('search_keywords: ',search_keywords);
        _gaq.push(['_trackEvent', 'Actions', 'Initialized Gather Results of Search Keywords', 'from Gather Search Results View']);
 
        chrome.runtime.sendMessage({type:"initiateSearchKeywordsScraping", search_keywords: search_keywords }, 
            function(response){
                console.log('this is the response from the content page for the initiateSearchKeywordsScraping Event',response); 
                if(response.error){
                    let theErrorMessage = response.data.responseJSON.error;
                    console.log('theErrorMessage:',theErrorMessage);
                    $scope.errorMessage = theErrorMessage;
                    $scope.error = true;  
                } else {
                     $state.go('home.dance-time');
                }
            }
        );   
    }

    //scrape purchase history result
    $scope.initiateHistoryScraping = function(user){
        _gaq.push(['_trackEvent', 'Actions', 'Initialized Gather My Order History', 'from Gather History View'])

        $state.go('home.dance-time');
        chrome.runtime.sendMessage({type:"initiateHistoryScraping", user: user }, 
            function(response){
                console.log('this is the response from the content page for initiateHistoryScraping Event',response);
                if(response.error){
                    let theErrorMessage = response.data.responseJSON.error;
                    console.log('theErrorMessage:',theErrorMessage);
                    $scope.errorMessage = theErrorMessage;
                    $scope.error = true;  
                }
            }
        ); 
    }

    chrome.runtime.onMessage.addListener(
      function(message, sender, sendResponse) {
        switch(message.type) {
            case 'fetchingComplete':
                $state.go('home.fetching-complete');
                sendResponse('all good');
                return true;
                break;
        } 
      }
    );

  }
]);

myApp.controller("ExportCtrl", ['$scope', '$http', '$state', function($scope, $http, $state){
   console.log("Export Controller Initialized");

    $scope.exportAsCSV = function(user){
        chrome.runtime.sendMessage({type:"exportAsCSV", user: user }, 
            function(response){
                console.log('this is the response from the content page for exportAsCSV Event',response);
                if(response.error){
                    let theErrorMessage = response.data.responseJSON.error;
                    console.log('theErrorMessage:',theErrorMessage);
                    $scope.errorMessage = theErrorMessage;
                    $scope.error = true;  
                }
            }
        );
    }

    $scope.exportAsJSON = function(user){

    }

}]);