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

if(url.includes('amazon.com/gp/your-account') && !url.includes('&orderFilter=')){
	//first landing on the main orders page
	//send all the dropDown Options to the Background page
	//navigate to a specific Time Period ()
	//log whichever year has been completely scraped

	let purchaseYears = [];
	var theOptions = document.querySelectorAll('#timePeriodForm #orderFilter')[0].options;
	for (i = 0; i < theOptions.length; i++) { 
    	purchaseYears.push(theOptions[i].value);
	}
    sendToBackground("purchaseYears", purchaseYears);
    // window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter='+dropDownOptions.slice(-1)[0]; 
} else if (url.includes('amazon.com/gp/your-account/') && url.includes('&orderFilter=')){
	//got to yearly page - need to:
    //send all the orderPageURLs to the Background page
    //navigate to a specific orders page
    //log whichever page has already been visited
    console.log('on a yearly page now');
    window.scrollTo(0,document.querySelector(".navLeftFooter").scrollHeight+5000);

    setTimeout(function(){ 
    	sendToBackground("orderDetails", fetchYearlyOrders());
    	}, 
    5000);  
}

function sendToBackground(eventName, eventData){
	chrome.runtime.sendMessage({type: eventName, data: eventData }, 
            function(response){
                console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
            }
    );
}

function fetchYearlyOrders(){
	let orderDetails = [];
	let products = document.querySelectorAll('.a-fixed-left-grid-inner')

	for (i = 0; i < products.length; i++) {
	    let item = {};
	    
	    let cleanedUpValues = products[i].innerText.split("\n");
	    item.product_title = cleanedUpValues[0];    
	    item.product_by = cleanedUpValues[1]; 
	    item.product_cost = cleanedUpValues[4];   

	    orderDetails.push(item);
	}

	return orderDetails;
}