console.log('content script ran')
var url = window.location.href;

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
                if(eventName=='ordersPageDetails' && response.nextWhat == 'nextYear'){
                	window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter=year-'+response.year+'&amazonhistoryfetching=on';
                } else if (eventName=='ordersPageDetails' && response.nextWhat == 'nextPage' && typeof response.year != 'undefined'){
                    window.location.href = 'https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2_3_4_5?ie=UTF8&orderFilter=year-'+response.year+'&search=&startIndex='+response.startIndex+'&amazonhistoryfetching=on';
                } 
            }
    );
}

function getYear(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
  let orderFilter = urlParams.get('orderFilter');
  if(orderFilter){
      return orderFilter.split('-')[1];
  } else {
    return 'orderFilter not found';
  }
}

function getPageNumber(){
	let queryString = window.location.search;
	let urlParams = new URLSearchParams(queryString);
	let startIndex = urlParams.get('startIndex');
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