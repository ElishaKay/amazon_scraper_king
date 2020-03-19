console.log('content script ran')
var url = window.location.href;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.type == "scrapeAmazon"){
    	window.location.href='https://www.amazon.com/gp/your-account/order-history';
    	sendResponse('all good');
    } 
  }
);

if(url.includes('amazon.com/gp/your-account') && !url.includes('digitalOrders=1&unifiedOrders=1')){
	//first landing on the main orders page
	//send all the dropDown Options to the Background page
	//navigate to a specific Time Period ()
	//log whichever year has been completely scraped

	let dropDownOptions = [];
	var theOptions = document.querySelectorAll('#timePeriodForm #orderFilter')[0].options;
	for (i = 0; i < theOptions.length; i++) { 
    	dropDownOptions.push(theOptions[i].value);
	}
    sendToBackground("dropDownOptions", dropDownOptions);
    // window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter='+dropDownOptions.slice(-1)[0]; 
} else if (url.includes('amazon.com/gp/your-account') && url.includes('digitalOrders=1&unifiedOrders=1')){
	//got to yearly page - need to:
	//send all the orderPageURLs to the Background page
	//navigate to a specific orders page
	//log whichever page has already been visited
	'See All Products Button'
	var orderPageURLs = [];
	var orderPageButtons = document.querySelectorAll('.a-size-medium')

	for (i = 0; i <  orderPageButtons.length; i++) { 
	    if(orderPageButtons[i].href){
	    	orderPageURLs.push( orderPageButtons[i].href);
		}
	}
	sendToBackground("orderPageURLs", orderPageURLs);
	// window.location.href = orderPageURLs.slice(-1)[0]; 
} else if (url.includes('amazon.com/gp/your-account/order-details')){
	//got to page of a given order details within a given year

	console.log('order details page');
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
    sendToBackground("orderDetails", orderDetails);
}

function sendToBackground(eventName, eventData){
	chrome.runtime.sendMessage({type: eventName, data: eventData }, 
            function(response){
                console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
            }
    );
}