let dev_server_url = 'http://localhost:8000/';
let prod_server_url = 'http://138.197.196.165/';
let environment = 'dev';
let domain = environment == 'dev' ? dev_server_url : prod_server_url;
let multi_page = false;

chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case 'loginViaExtension':
            		console.log('ran loginViaExtension in background.js');
            		ajaxCall('POST',message.data,'api/extension/login', function(response){
            			console.log('login response from ajax:', response);
            			if(response.error){
            				sendResponse(response);
            			} else{
            				setStorageItem('user',response);
							sendResponse(response);	
            			}            		
            		});
            		return true;
            		break;
            	case 'initiateHistoryScraping':
            		chrome.tabs.create({url: 'https://www.amazon.com/gp/css/order-history?amazonhistoryfetching=on'});
				    
					return true;
				    break;
				case 'initiateHistoryScraping':
            		chrome.tabs.create({url: + message.data.search_url + '&amazonhistoryfetching=on'});
				    
					return true;
				    break;
				case 'purchaseYears':
					let purchaseYears = [];
					for (let i = 0; i < message.data.length; i++) { 
						let value = message.data[i];
						if(value.includes('-')&&!value.includes('months')){
							 purchaseYears.unshift(value.split('-')[1]);
						}
					}
					setStorageItem(message.type, purchaseYears);
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
					}
					
					message.data._id = getStorageItem('user').user._id;
					message.data.multi_page = multi_page;
					message.data.total_pages = paginationDetails.length == 0 ? 1 : paginationDetails.length; 
					setStorageItem(message.type, message.data);
					ajaxCall('POST',message.data,'api/extension/products', function(response){
						let nextWhat = '';
						let year = 0;
						let startIndex = 0;
						let purchaseYears = getStorageItem('purchaseYears');

						console.log('response from api/extension/products',response);
						if(response.multiPageYear=="false"){
							// ie lechatchila there was only one page for the year
							// find index of the year which was just scraped
							let index = purchaseYears.indexOf(response.purchaseYear.toString());

							//navigate to the next year in the purchaseYears Array
							nextWhat = 'nextYear';
							year = purchaseYears[index + 1];
						} else {
							//multi-page year
							//step 1: check whether you just scraped the final page
							
							if(response.yearlyPageNumber == response.totalPagesOfYear){
								// find index of the year which was just scraped
								let index = purchaseYears.indexOf(response.purchaseYear.toString());
								//navigate to the next year in the purchaseYears Array
								nextWhat = 'nextYear';
								year = purchaseYears[index + 1];
							} else {
							// you are on a year page with more than one page in it 
							//& you need to navigate to the next page of the given year
								startIndex = response.yearlyPageNumber*10;
								nextWhat = 'nextPage';
								year = response.purchaseYear;
							}
						}
						sendResponse({nextWhat: nextWhat, year:year, startIndex:startIndex});
            		});
					return true;
					break;
				case 'paginationDetails':
					setStorageItem(message.type, message.data);
					sendResponse('all good');
					return true;
					break;
				case 'searchPageData':
					setStorageItem(message.type, message.data);
					message.data._id = getStorageItem('user').user._id;
					ajaxCall('POST',message.data,'api/extension/products-from-search', function(response){
            			console.log('response from server for /extension/products-from-search post request:', response);
            			let nextWhat = '';
            			let searchKeyword = '';
            			let nextPageNumber = 1;

            			if(response.searchPageNumber <= response.totalSearchPages){
            				nextWhat = 'nextPage';
            				nextPageNumber = response.searchPageNumber+1;
            				searchKeyword = response.searchKeyword;	
            			} else {
            				nextWhat = 'nextKeyword';
            			}
            			sendResponse({nextWhat: nextWhat, nextPageNumber: nextPageNumber, searchKeyword: searchKeyword });            		
            		});
					return true;
					break;
				default:
				    // code block
            }
        }
);

function setStorageItem(varName, data){
	console.log('varName: ', varName);
	if(varName!='searchPageData'){
		console.log('data', data);
		window.localStorage.setItem(varName, JSON.stringify(data));
	}
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
          callback({error: true, data: a});
        }
    });
}