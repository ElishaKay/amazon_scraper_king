Extras from content.js page

console.log("Content js script loaded for amazon popup shop");

console.log('localStorage user:',JSON.parse(window.localStorage.getItem('user')));

// window.scrollTo(0,document.querySelector(".navLeftFooter").scrollHeight+5000);         
// localStorage.removeItem('search_term');
// window.location.href = 'https://www.pinterest.com/search/pins/?q='+search_term;
// let search_term = localStorage.getItem('search_term');


//on orders page:
From All Orders of 2020 Page:'https://www.amazon.com/gp/your-account/order-history?opt=ab&digitalOrders=1&unifiedOrders=1&returnTo=&orderFilter=year-2020'

Step 1: you need to click unto the button: "Order Details" or "See all 7 products"

Step 2: That full page will befor example:"https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00_s00?ie=UTF8&orderID=114-4917364-5138627"

Then, this script works: 

let products = document.querySelectorAll('.a-fixed-left-grid-inner')

for (i = 0; i < products.length; i++) {
    let item = {};
    
    let cleanedUpValues = products[i].innerText.split("\n");
    item.product_title = cleanedUpValues[0];    
    item.product_by = cleanedUpValues[1]; 
    item.product_cost = cleanedUpValues[3];   

    console.log(item);
}



to grab product info:
let products = document.querySelectorAll('.a-fixed-left-grid-inner')


in case you need it in the future:
let currencies = ['د.إ','Af','L','Դ','Kz','$','$','ƒ','ман','КМ','$','৳','лв','ب.د','₣','$','$','Bs.','R$','$','','P','Br','$','$','₣','₣','$','¥','$','₡','$','$','Kč','₣','kr','$','د.ج','£','Nfk','','€','$','£','£','ლ','₵','£','D','₣','Q','$','$','L','Kn','G','Ft','Rp','₪','₹','ع.د','﷼','Kr','$','د.ا','¥','Sh','','៛','₩','₩','د.ك','$','〒','₭','ل.ل','Rs','$','L','ل.د','د.م.','L','','ден','K','₮','P','UM','₨','ރ.','MK','$','RM','MTn','$','₦','C$','kr','₨','$','ر.ع.','B/.','S/.','K','₱','₨','zł','₲','ر.ق','L','din','р.','₣','ر.س','$','₨','£','kr','$','£','Le','Sh','$','Db','ل.س','L','฿','ЅМ','m','د.ت','T$','₤','$','$','Sh','₴','Sh','$','$','','Bs F','₫','Vt','T','₣','$','₣','﷼','R','ZK','$'];


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