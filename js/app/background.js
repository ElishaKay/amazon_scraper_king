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
            		
            	case 'scrapeTime':
				    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				    	console.log('tabs', tabs);
				    	tabs[0].url = 'https://stackoverflow.com';
					  	chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
					    	console.log(response.farewell);
					  });
					});
					return true;
				    // code block
				 //    console.log('in background.js scrapeTime switch: ', message);
					// chrome.tabs.query({
					//   active: true,
					//   currentWindow: true
					// }, function(tabs) {
					//   chrome.runtime.sendMessage({type:"backgroundCmdToScrape", user: window.localStorage.getItem('user')}, 
				 //            function(response){
				 //                console.log('this is the response from the content page for scrapeTime Event',response);
				 //            }
				 //        ); 

					//   console.log('background js page', tabs)
					//   var activeTab = tabs[0];

					//   chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
					// });
                     console.log('message',message);
                    return true;
				    break;
				case 'armageddon':
				    // code block
				    break;
				default:
				    // code block
            }
        }
);