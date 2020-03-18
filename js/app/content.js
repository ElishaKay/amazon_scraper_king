console.log('content script ran')
var url = window.location.href;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello"){
    	window.location.href='https://www.amazon.com/gp/your-account/order-history';
    	sendResponse({farewell: "goodbye"});
    } 
  }
);

if(url.includes('amazon.com/gp/your-account') && !url.includes('digitalOrders=1&unifiedOrders=1')){
	let dropDownOptions = [];
	var theOptions = document.querySelectorAll('#timePeriodForm #orderFilter')[0].options;
	for (i = 0; i < theOptions.length; i++) { 
    	dropDownOptions.push(theOptions[i].text);
	}
	chrome.runtime.sendMessage({type:"dropDownOptions", dropDownOptions: dropDownOptions }, 
            function(response){
                console.log('this is the response from the background page for dropDownOptions Event',response);
            }
    ); 
} else if (url.includes('amazon.com/gp/your-account') && url.includes('digitalOrders=1&unifiedOrders=1')){

} else if (url.includes('amazon.com/gp/your-account/order-details')){
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
	chrome.runtime.sendMessage({type:"orderDetails", orderDetails: orderDetails }, 
            function(response){
                console.log('this is the response from the background page for orderDetails Event',response);
            }
    );

}