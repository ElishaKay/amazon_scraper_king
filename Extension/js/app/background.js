let dev_server_url = 'http://localhost:8000/';
let prod_server_url = 'http://138.197.196.165/';
let environment = 'dev';
let domain = environment == 'dev' ? dev_server_url : prod_server_url;
let multi_page = false;

//google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-162862101-3']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

chrome.runtime.onMessage.addListener(
        function(message, sender, sendResponse) {
            switch(message.type) {
            	case 'onPopupInit':
            		console.log('ran onPopupInit Case in background.js');
					sendResponse(getStorageItem('user'));
            		return true;
            		break;
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
            		console.log('message: ',message);
            		chrome.tabs.create({url: 'https://www.amazon.com/gp/css/order-history?ahf=on'});
					return true;
				    break;
				case 'initiateSearchScraping':
					console.log('message: ',message);
            		chrome.tabs.create({url: message.search_url + '&asf=on'});
					return true;
				    break;
				case 'initiateSearchKeywordsScraping':
					console.log('message: ',message);
					let search_keywords = message.search_keywords.split(',');
					setStorageItem('search_keywords',search_keywords);
					var search_url = 'https://www.amazon.com/s?k='+ search_keywords[0];
            		chrome.tabs.create({url: search_url + '&asf=on'});
				    
					return true;
				    break;
				case 'amazonPage':
				    console.log('message: ',message);
				    message.amazon_page._id = getStorageItem('user').user ? getStorageItem('user').user._id : JSON.parse(getStorageItem('user')).user._id;

				    ajaxCall('POST',message.amazon_page,'api/extension/url', function(response){
            			console.log('post response from ajax:', response);           		
            		});
				    return true;
				    break;
				case 'exportAsCSV':
					console.log('exportAsCSV: ',message);
					let user = getStorageItem('user').user;
				    ajaxCall('GET',{},`api/${user.username}/blogs/csv`, function(response){
            			console.log('response from exportAsCSV ajax:', response);
            			if(response.error){
            				sendResponse(response);
            			} else{
            				setStorageItem('user',response);
							sendResponse(response);	
            			}            		
            		});
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
					
					message.data._id = getStorageItem('user').user ? getStorageItem('user').user._id : JSON.parse(getStorageItem('user')).user._id;
					message.data.multi_page = multi_page;
					message.data.total_pages = paginationDetails.length == 0 ? 1 : paginationDetails.length; 
					setStorageItem(message.type, message.data);
					ajaxCall('POST',message.data,'api/extension/products', function(response){
						let nextWhat = '';
						let year = 0;
						let startIndex = 0;
						let purchaseYears = getStorageItem('purchaseYears');

						console.log('response from api/extension/products',response);
						if(response.message = 'zero products' || response.multiPageYear=="false"){

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
					setStorageItem('searchPageDetails', {searchKeyword: message.data.searchKeyword, totalSearchPages: message.data.totalSearchPages, searchPageNumber: parseInt(message.data.searchPageNumber) } );
					setStorageItem(message.type, message.data);
					
					message.data._id = getStorageItem('user').user ? getStorageItem('user').user._id : JSON.parse(getStorageItem('user')).user._id;

					ajaxCall('POST',message.data,'api/extension/products-from-search', function(response){
            			console.log('response from server for /extension/products-from-search post request:', response);
            			let nextWhat = '';
            			let searchKeyword = '';
            			let nextPageNumber = 1;

            			if(response.error){
            				nextWhat = 'nextPage';
            				//need to pull up keyword from localStorage
            				let searchPageDetails = getStorageItem('searchPageDetails')
            				nextPageNumber = searchPageDetails.searchPageNumber+1;
            				searchKeyword = searchPageDetails.searchKeyword;
            			} else if(response.searchPageNumber < response.totalSearchPages){
            				nextWhat = 'nextPage';
            				nextPageNumber = response.searchPageNumber+1;
            				searchKeyword = response.searchKeyword;	
            			} else if(response.searchPageNumber == 75 || response.nextWhat == 'nextKeyword'){
            				nextWhat = 'nextKeyword';
            				let search_keywords = getStorageItem('search_keywords');
            				let index = search_keywords.indexOf(response.searchKeyword.toString());
            				console.log('index of keyword: ', index);
            				console.log('search_keywords: ', search_keywords);

							//navigate to the next keywords in the purchaseYears Array
							searchKeyword = search_keywords[index + 1];
            			} else {
            				nextWhat = 'nextKeyword';
            				let search_keywords = getStorageItem('search_keywords');
            				let index = search_keywords.indexOf(response.searchKeyword.toString());
            				console.log('index of keyword: ', index);
            				console.log('search_keywords: ', search_keywords);

							//navigate to the next keywords in the purchaseYears Array
							searchKeyword = search_keywords[index + 1];
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
	window.localStorage.setItem(varName, JSON.stringify(data));
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function getStorageItem(varName){
	if(isJsonString(localStorage.getItem(varName))){
		return JSON.parse(localStorage.getItem(varName));
	} else {
		return localStorage.getItem(varName);
	}
}

function ajaxCall(type,data,path,callback){
	$.ajax({
        url: domain + path,
        data: data,
        type: type,
        success: function(a) {
          console.log('server response: ',a);
          if(isJsonString(a)){
			callback(JSON.parse(a));
			} else {
			callback(a);
			}
		},
        error: function(a) {
          console.log("Error");
          callback({error: true, data: a});
        }
    });
}


function miniAjaxCall(type,data,path){
	$.ajax({
        url: domain + path,
        data: data,
        type: type,
        success: function(a) {
          console.log('server response: ',a);
          if(isJsonString(a)){
			callback(JSON.parse(a));
			} else {
			callback(a);
			}
        },
        error: function(a) {
          console.log("Error");
          callback({error: true, data: a});
        }
    });
}