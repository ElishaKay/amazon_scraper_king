console.log('content script ran')
var url = window.location.href;

//helpers
function getURLParam(paramName){
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);  
}

function ajaxGet(url, callback){
  $.ajax({
        url: url, 
        type: 'GET',
        success: function(a) {
          callback(a);
        },
        error: function(a) {
          console.log("Error: ",a);
        }
    });
}

// Fetching Search Page Data
if(url.includes('amazon.com/s?k=') && url.includes('amazonsearchfetching=on')){
  let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
  let searchPageData = [];
  for (i = 0; i < products.length; i++) {
  
    if(products[i].innerText!=''){
      let product = {};
      let image = products[i].querySelector('img');
      let product_link = products[i].querySelector('.a-size-mini a');
  
      if(image!= null && product_link){
            product.product_link = product_link.href;
            let productBriefs = products[i].innerText.split('\n');
  
            if(productBriefs[0] == 'Best Seller'){
              product.best_seller = true;
              productBriefs.splice(0, 1);
            } else {
              product.best_seller = false;
            }
  
            product.product_title = productBriefs[0];

            if(productBriefs[1]){
                product.product_by = productBriefs[1].split('by ')[1];  
            }
            
            if(product.product_by){
              product.product_by = product.product_by.split('|')[0].trim();  
            }
            
            if(productBriefs[2] && isNaN(parseInt(productBriefs[3]))){
                productBriefs.splice(2, 2);
            } 

            if(productBriefs[2]){
              product.product_rating = productBriefs[2].split(' ')[0];
            }
            
            if(productBriefs[3]){
              product.total_ratings = parseFloat(productBriefs[3].replace(/,/g, ''));  
            }
            
            product.main_format = productBriefs[4]; 
            product.product_imgurl = image.src;
  
            for (y = 5; y < productBriefs.length; y++) {
              if(productBriefs[y].includes('Other format')){
                  product.other_formats = productBriefs[y]; 
              }
              if(productBriefs[y].includes('$') && !productBriefs[y]!='$0' && !productBriefs[y]!='$0.00'){
                  product.product_cost = productBriefs[y];
                  continue;
              }    
            }
            
            if(productBriefs.length <=30){
              ajaxGet(product.product_link.split('amazon.com')[1], function(response){
                let element = $($.parseHTML( response ));
                product.product_summary = element.find("div").attr("data-feature-name", 'editorialReviews').prev("noscript")[0].innerHTML;
                searchPageData.push(product);
              })
            }
      }
    }
  }

  setTimeout(function(){ 
    sendToBackground("searchPageData", 
             {"searchPageData": searchPageData,
              "searchKeyword": getURLParam('k'),
              "totalSearchPages": getTotalSearchPages(),
              "searchPageNumber": getSearchPageNumber()});
    }, 
  10000);
}

function getTotalSearchPages(){
  let pagination = document.querySelectorAll('.a-pagination');
  if(pagination[0]){
      let paginationDetails = pagination[0].textContent.split('\n') 
      return parseInt(paginationDetails.slice(-3)[0].trim());
  } else {
      return {mutliPage:false};
  }
}

function getSearchPageNumber(){
  return getURLParam('page') || 1;
}


// Fetching Orders Page Data
if(url.includes('amazon.com/gp/css/order-history') && url.includes('amazonhistoryfetching=on') && !url.includes('orderFilter=')){
	//first landing on the main orders page
	//send all the dropDown Options to the Background page
	//navigate to a specific Time Period ()
  loadSideBar({yearlyPage: false});
	let purchaseYears = [];
	var theOptions = document.querySelectorAll('#timePeriodForm #orderFilter')[0].options;
	for (i = 0; i < theOptions.length; i++) { 
    	purchaseYears.push(theOptions[i].value);
	}
    sendToBackground("purchaseYears", purchaseYears);
    setTimeout(function(){ 
	    window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter='+purchaseYears.slice(-1)[0]+'&amazonhistoryfetching=on'; 
    	}, 
    10000);

} else if (url.includes('amazon.com/gp/your-account/') && url.includes('&amazonhistoryfetching=on') && url.includes('orderFilter=')){
	//got to yearly page - need to:
    //checkAndGetPagination
    //send OrderDetails to the Background
    console.log('on a yearly page now');
    loadSideBar({yearlyPage: true});

    if(getYear()=='undefined'){
        chrome.runtime.sendMessage({type: 'fetchingComplete', data: {fetchingComplete: true} }, 
                function(response){
                    console.log('this is the response from the popup page: ',response);
                }
        );
        
        setTimeout(function(){ 
            window.location.href = 'https://myamazonhistory.com/user/crud/blogs';
            }, 
        3000);
    }

    window.scrollTo(0,document.querySelector(".navLeftFooter").scrollHeight+5000);

    setTimeout(function(){ 
    	sendToBackground("ordersPageDetails", 
    					 {"purchase_year": getYear(),
    					  "page_number": getPageNumber(),
    					  "orderDetails": fetchYearlyOrders(),
    					  "paginationDetails": checkAndGetPagination()});
    	}, 
    10000);
}

function sendToBackground(eventName, eventData, callback){
	chrome.runtime.sendMessage({type: eventName, data: eventData }, 
            function(response){
                console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
                if(eventName=='ordersPageDetails'){
                    if(response.nextWhat == 'nextYear'){
                      window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter=year-'+response.year+'&amazonhistoryfetching=on';
                    } else if (response.nextWhat == 'nextPage' && typeof response.year != 'undefined'){
                        window.location.href = 'https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2_3_4_5?ie=UTF8&orderFilter=year-'+response.year+'&search=&startIndex='+response.startIndex+'&amazonhistoryfetching=on';
                    }
                } else if(eventName=='searchPageData'){
                    console.log('searchPageData response block ran');
                    if(response.nextWhat == 'nextPage'){
                        window.location.href = 'https://www.amazon.com/s?k='+response.searchKeyword+'&i=stripbooks-intl-ship&amazonsearchfetching=on&page='+response.nextPageNumber;
                    } else if(response.nextWhat == 'nextKeyword'){
                        console.log('reached nextKeyword conditional block');
                        window.location.href = 'https://www.amazon.com/s?k='+response.searchKeyword+'&i=stripbooks-intl-ship&amazonsearchfetching=on&page=1';
                    }
                }
            }
    );
}


function getYear(){
  let orderFilter = getURLParam('orderFilter');
  if(orderFilter){
      return orderFilter.split('-')[1];
  } else {
    return 'orderFilter not found';
  }
}

function getPageNumber(){
	let startIndex = getURLParam('startIndex');
	if(startIndex){
		return (startIndex/10)*2;	
	} else {
		return 1;
	}
}

let page_number = 1;

function fetchYearlyOrders(){
    let orderDetails = [];
    let products = document.querySelectorAll('.a-fixed-left-grid-inner')
    for (i = 0; i < products.length; i++) {
        let item = {};
        let cleanedUpValues = products[i].innerText.split("\n");
        item.product_title = cleanedUpValues[0];    
        item.product_by = cleanedUpValues[1]; 
        item.product_cost = cleanedUpValues[cleanedUpValues.indexOf('Buy it again')-1];
        item.product_link = products[i].firstElementChild.firstElementChild.firstElementChild.href;   
        let imgurl = products[i].firstElementChild.firstElementChild.firstElementChild.innerHTML.split("\"");
        item.product_imgurl = imgurl[imgurl.findIndex(element => element.includes("images/I"))];
        orderDetails.push(item);
    }
    return orderDetails;
}

function checkAndGetPagination(){
	let pageNumbers = [];
	let pagination = document.querySelectorAll('.pagination-full');
	if(pagination[0]){
		let extractedNumbers = pagination[0].innerText.match(/\d/g);
		for (i = 0; i < extractedNumbers.length; i++) { 
	    	pageNumbers.push(parseInt(extractedNumbers[i]));
		}
		return pageNumbers;
	} else {
		return [];
	}
}


function loadSideBar(config){
    let year = getYear(); 
    let sidebar = 
    `<div class='from-right'> 
        <a id='thetogglebutton'><div id='togglebar' class='nav-right hidden-xs'> 
        <div class='button' id='btn thetogglebutton'> 
                <div class='bar top'></div> 
                <div class='bar middle'></div> 
                <div class='bar bottom'></div> 
            </div> </div> </a></div>
            <div class='sidebar'> 
            <div class='sidebar-list'>
                    <h2>Currently Fetching Data from ${config.yearlyPage && year != 'undefined' ? year : 'Amazon'}</h2>
                    <p>The MyAmazonHistory Chrome Extension is now populating your 
                    Social Shopping Dashboard 😊</p>
                    <p>Please keep this tab open as your Public Shopping Dashboard is being generated.
                    </p>
                    <p>You'll be able to hide specific orders via your MyAmazonHistory Dashboard once 
                    this process is complete.</p>
            </div>
    </div>


    <style>
        .hidden{
            display: none;
        }

        #thetogglebutton{
          position: fixed;
          top: 50px;
          right: 80px;
          z-index: 500;
        }

        .sidebar {
          height: 100%;
          width: 400px;
          position: fixed;
          top: 0;
          right: 0;
          /*background-color: #EF8354;*/
          z-index: 200;
        }

        .bar {
          display: block;
          height: 5px;
          width: 50px;
          background-color: #EF8354;
          margin: 10px auto;
        }

        .middle {
          margin: 0 auto;
        }

        .bar {
          -webkit-transition: all .7s ease;
          -moz-transition: all .7s ease;
          -ms-transition: all .7s ease;
          -o-transition: all .7s ease;
          transition: all .7s ease;
        }

        .sidebar-list {
          padding-right: 30px;
          padding-bottom: 50px;
          padding-left: 30px;
          margin: 0;
          list-style: none;
          position: absolute;
          margin-top: 150px;
        }

        .sidebar.active{
          background-color: #E5E9EC;
        }

        .sidebar-list h2{
          padding-bottom: 30px;
          text-align: center;
        }

        .sidebar-list p{
          padding-left: 25px;
          font-size: 15px;
        }
    </style>`;

    var sideNav = document.createElement('div');
    sideNav.innerHTML = sidebar;
    document.body.insertBefore(sideNav, document.body.firstChild);

    function toggleSidebar() {
      $(".button").toggleClass("active");
      $(".sidebar-item").toggleClass("active");
      $(".sidebar").toggleClass("active");
      };

    toggleSidebar();

    var button = document.getElementById('thetogglebutton');
    button.addEventListener('click', function(){
        toggleSidebar();
        $(".sidebar").toggleClass("hidden");
    });
}