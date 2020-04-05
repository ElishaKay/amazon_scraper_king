console.log('content script ran')
var url = window.location.href;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
  	switch(message.type) {
       	case 'scrapeAmazon':
	    	window.location.href='https://www.amazon.com/gp/your-account/order-history';
	    	sendResponse('all good');
	    	return true;
			break;
		default:
		    console.log('default match');
    } 
  }
);

if(url.includes('amazon.com/gp/your-account') && !url.includes('orderFilter=')){
	//first landing on the main orders page
	//send all the dropDown Options to the Background page
	//navigate to a specific Time Period ()

	let purchaseYears = [];
	var theOptions = document.querySelectorAll('#timePeriodForm #orderFilter')[0].options;
	for (i = 0; i < theOptions.length; i++) { 
    	purchaseYears.push(theOptions[i].value);
	}
    sendToBackground("purchaseYears", purchaseYears);
    setTimeout(function(){ 
	    window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter='+purchaseYears.slice(-1)[0]; 
    	}, 
    10000);

} else if (url.includes('amazon.com/gp/your-account/') && url.includes('orderFilter=')){
	//got to yearly page - need to:
    //checkAndGetPagination
    //send OrderDetails to the Background
    console.log('on a yearly page now');

    if(getYear()=='undefined'){
        chrome.runtime.sendMessage({type: 'fetchingComplete', data: {fetchingComplete: true} }, 
                function(response){
                    console.log('this is the response from the popup page: ',response);
                }
        );
        
        setTimeout(function(){ 
            window.location.href = 'http://localhost:3000/user/crud/blogs';
            }, 
        3000);
    }

    window.scrollTo(0,document.querySelector(".navLeftFooter").scrollHeight+5000);

    setTimeout(function(){ 
    	sendToBackground("ordersPageDetails", 
    					 {"purchase_year": getYear(),
    					  "page_number": getPageNumber(),
    					  "orderDetails": fetchYearlyOrders(),
    					  "paginationDetails": checkAndGetPagination()});
    	}, 
    10000);
}

function sendToBackground(eventName, eventData, callback){
	chrome.runtime.sendMessage({type: eventName, data: eventData }, 
            function(response){
                console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
                if(eventName=='ordersPageDetails' && response.nextWhat == 'nextYear'){
                	window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter=year-'+response.year;
                } else if (eventName=='ordersPageDetails' && response.nextWhat == 'nextPage' && typeof response.year != 'undefined'){
                    window.location.href = 'https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2_3_4_5?ie=UTF8&orderFilter=year-'+response.year+'&search=&startIndex='+response.startIndex;
                } 
            }
    );
}

function getYear(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	return urlParams.get('orderFilter').split('-')[1];
}

function getPageNumber(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	let startIndex = urlParams.get('startIndex');
	if(startIndex){
		return (startIndex/10)*2;	
	} else {
		return 1;
	}
}

let page_number = 1;

function fetchYearlyOrders(){
    let orderDetails = [];
    let products = document.querySelectorAll('.a-fixed-left-grid-inner')
    for (i = 0; i < products.length; i++) {
        let item = {};
        let cleanedUpValues = products[i].innerText.split("\n");
        item.product_title = cleanedUpValues[0];    
        item.product_by = cleanedUpValues[1]; 
        item.product_cost = cleanedUpValues[cleanedUpValues.indexOf('Buy it again')-1];
        item.product_link = products[i].firstElementChild.firstElementChild.firstElementChild.href;   
        let imgurl = products[i].firstElementChild.firstElementChild.firstElementChild.innerHTML.split("\"");
        item.product_imgurl = imgurl[imgurl.findIndex(element => element.includes("images/I"))];
        orderDetails.push(item);
    }
    return orderDetails;
}

function checkAndGetPagination(){
	let pageNumbers = [];
	let pagination = document.querySelectorAll('.pagination-full');
	if(pagination[0]){
		let extractedNumbers = pagination[0].innerText.match(/\d/g);
		for (i = 0; i < extractedNumbers.length; i++) { 
	    	pageNumbers.push(parseInt(extractedNumbers[i]));
		}
		return pageNumbers;
	} else {
		return [];
	}
}