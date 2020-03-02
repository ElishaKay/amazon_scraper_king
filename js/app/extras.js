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