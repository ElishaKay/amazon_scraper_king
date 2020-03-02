//on orders page:

to grab product info:
document.querySelectorAll('.a-fixed-left-grid-inner')


//In order to navigate to the right URL's, really just need one parameter
//may be worthwhile to fetch the current url right before we start scraping,
// then append to it search for the "orderFilter" param in the URL
// If the param is there, replace it, else append to the given URL.
'https://www.amazon.com/gp/your-account/order-history?orderFilter=year-2019'

To fetch the options available for the given amazon user:
document.querySelectorAll('#timePeriodForm span select option')

document.querySelector('#timePeriodForm')


$state.go('home.fetch-amazon-data');

window.localStorage.getItem('user')

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});


// get creds of client's pinterest users
        
$http.get($scope.baseUrl+'/getcreds/'+$scope.client_analytics_code)
     .then(function (response) {
        console.log(response.data);
        if (response.data){
            $scope.users = response.data;
            logIn();
        }                 
     }, function errorCallback(response) {
    console.log(`error when logging in: ${response}`)
}); 




// get client's existing campaign search_terms
$http.get($scope.baseUrl+'/getcampaigns/'+$scope.client_analytics_code)
     .then(function (response) {
        console.log(response.data);
        if (response.data){
            console.log('here is the campaigns API response from the server', response.data);
            $scope.campaigns = response.data == [] ? false : response.data;
            logIn();
        } 
    }, function errorCallback(response) {
    console.log(`error when fetching existing campaigns: ${response}`)
}); 



 $scope.loginViaExtension = function(formData) {
        chrome.tabs.sendMessage(tabs[0].id, {type:"loginViaExtension", data: formData }, function(response){
            // console.log('this is the response from content page',response)        
    })
 };