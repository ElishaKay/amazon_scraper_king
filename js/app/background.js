let server_url = 'http://localhost:8000/';
let production_server_url = 'https://myfavoriteproducts.herokuapp.com/';

// after login, you can get the user here like so:
// localStorage.getItem(user);

chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case 'loginViaExtension':
            		console.log('ran loginViaExtension in background.js');
            		$.ajax({
	                    url: server_url + "api/login-via-extension",
	                    data: {client_email: message.data.client_email, 
	                    	   client_password: message.data.client_password},
	                    type: "POST",
	                    success: function(a) {
	                      console.log(a);
	                      window.localStorage.setItem('user', JSON.stringify(a));
	                      sendResponse(a[0]);

	                    },
	                    error: function(a) {
	                      console.log("Error");
	                      console.log(a);
	                    }
	                });
	                return true;
            		break;
            	case 'scrapeTime':
				    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				    	console.log('tabs', tabs);
				    	tabs[0].url = 'https://stackoverflow.com';
					  	chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
					    	console.log(response.farewell);
					  });
					});
					return true;
				    break;
				case 'dropDownOptions':
					console.log('these are the given users dropDownOptions:', message.dropDownOptions);
					window.localStorage.setItem('dropDownOptions', JSON.stringify(message.dropDownOptions));
				    // code block
				    break;
				case 'orderDetails':
					console.log('these are the given users orderDetails:', message.orderDetails);
					window.localStorage.setItem('orderDetails', JSON.stringify(message.orderDetails));
				    break;
				default:
				    // code block
            }
        }
);