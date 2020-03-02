let server_url = 'https://ampituptime.herokuapp.com';

chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case 'imageData':
				    // code block
				    console.log('in background.js, got image Data from content.js: ', message)
                    
                    let imagesArr = message.images;
                        for (i = 0; i < imagesArr.length; i++) {
                        	$.ajax({
			                    url: server_url + "/save-images'",
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