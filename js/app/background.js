let dev_server_url = 'http://localhost:8000/';
let prod_server_url = 'https://myfavoriteproducts.herokuapp.com/';
let environment = 'dev';
let domain = environment == 'dev' ? dev_server_url : prod_server_url;
let current_year_page = 1;
let page_number = 1;
let multi_page = false;
// after login, you can get the user here like so:
// localStorage.getItem(user);

chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case 'loginViaExtension':
            		console.log('ran loginViaExtension in background.js');
            		ajaxCall('POST',message.data,'api/login-via-extension', function(response){
	            		setStorageItem('user',response[0]);
						sendResponse(response[0]);
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
				case 'purchaseYears':
					setStorageItem(message.type, message.data);
					sendResponse('all good');
				    return true;
				    break;
				case 'ordersPageDetails':
					let paginationDetails = message.data.paginationDetails;
					if (paginationDetails === undefined || paginationDetails.length == 0) {
					    page_number = 1; 
					    multi_page = false;
					} else {
						multi_page = 1;
						let previousOrdersPageDetails = getStorageItem('ordersPageDetails');
						if(previousOrdersPageDetails.purchase_year = message.data.purchase_year){
							page_number = page_number++; 
						}
					}
					setStorageItem(message.type, message.data);
					message.data.client_id = getStorageItem('user').client_id;
					message.data.page_number = page_number;
					message.data.multi_page = multi_page;
					ajaxCall('POST',message.data,'api/save-yearly-products', function(response){
						console.log(response);
						sendResponse(response);
            		});
					return true;
					break;
				case 'paginationDetails':
					setStorageItem(message.type, message.data);
					sendResponse('all good');
					return true;
					break;
				default:
				    // code block
            }
        }
);

function setStorageItem(varName, data){
	console.log('varName: ', varName);
	console.log('data', data);
	window.localStorage.setItem(varName, JSON.stringify(data));
}

function getStorageItem(varName){
	return JSON.parse(localStorage.getItem(varName));
}

function ajaxCall(type,data,path,callback){
	$.ajax({
        url: domain + path,
        data: data,
        type: type,
        success: function(a) {
          console.log('server response: ',a);
          callback(a);
        },
        error: function(a) {
          console.log("Error");
          console.log(a);
        }
    });
}