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
					  	chrome.tabs.sendMessage(tabs[0].id, {type: "scrapeAmazon"}, function(response) {
					    	console.log(response);
					  });
					});
					return true;
				    break;
				case 'dropDownOptions':
					saveContentJSData(message.type, message.data);
					sendResponse('all good');
				    return true;
				    break;
				case 'orderPageURLs':
					saveContentJSData(message.type, message.data);
					sendResponse('all good');
					return true;
					break;
				case 'orderDetails':
					saveContentJSData(message.type, message.data);
					sendResponse('all good');
					return true;
					break;
				default:
				    // code block
            }
        }
);

function saveContentJSData(eventName, data){
	console.log('eventName', eventName);
	console.log('data', data);
	window.localStorage.setItem(eventName, JSON.stringify(data));
}