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
	                    },
	                    error: function(a) {
	                      console.log("Error");
	                      console.log(a);
	                    }
	                });
            		
            	case 'imageData':
				    // code block
				    console.log('in background.js, got image Data from content.js: ', message)
                    
                    let imagesArr = message.images;
                        for (i = 0; i < imagesArr.length; i++) {
                        	$.ajax({
			                    url: server_url + "/save-images",
			                    data: imagesArr[i],
			                    type: "POST",
			                    success: function(a) {
			                      console.log(a);
			                    },
			                    error: function(a) {
			                      console.log("Error");
			                      console.log(a);
			                    }
			                });      
                    }

				    break;
				case 'armageddon':
				    // code block
				    break;
				default:
				    // code block
            }
        }
);