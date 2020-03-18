console.log('content script ran')

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello"){
    	window.location.href='https://www.amazon.com/gp/your-account/order-history';
    	sendResponse({farewell: "goodbye"});
    } 
  }
);

if(window.location.href.includes('amazon.com/gp/your-account')){
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
}