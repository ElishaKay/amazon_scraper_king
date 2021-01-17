function sendToBackground(eventName, eventData, callback){
	chrome.runtime.sendMessage({type: eventName, data: eventData }, 
            function(response){
                console.log('this is the response from the background page for the '+ eventName+ ' Event: ',response);
                if(eventName=='ordersPageDetails'){
                    if(response.nextWhat == 'nextYear'){
                      window.location.href = 'https://www.amazon.com/gp/your-account/order-history?orderFilter=year-'+response.year+'&ahf=on';
                    } else if (response.nextWhat == 'nextPage' && typeof response.year != 'undefined'){
                      window.location.href = 'https://www.amazon.com/gp/your-account/order-history/ref=ppx_yo_dt_b_pagination_1_2_3_4_5?ie=UTF8&orderFilter=year-'+response.year+'&search=&startIndex='+response.startIndex+'&ahf=on';
                    }
                } else if(eventName=='searchPageData'){
                    console.log('searchPageData response block ran');
                    if(response.nextWhat == 'nextPage'){
                        window.location.href = 'https://www.amazon.com/s?k='+response.searchKeyword+'&asf=on&page='+response.nextPageNumber+'&i=stripbooks-intl-ship';
                    } else if(response.nextWhat == 'nextKeyword'){
                        console.log('reached nextKeyword conditional block');
                        window.location.href = 'https://www.amazon.com/s?k='+response.searchKeyword+'&asf=on&page=1&i=stripbooks-intl-ship';
                    }
                }
            }
    );
}
