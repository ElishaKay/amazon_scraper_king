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

function fetchYearlyOrders(){
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
        fetchSummaryAndReviews(item);
    }
}

function fetchSummaryAndReviews(product){
    ajaxGet(product.product_link.split('amazon.com')[1], function(response){
        let element = $($.parseHTML( response ));
        product.product_summary = element.find("div").attr("data-feature-name", 'editorialReviews').prev("noscript")[0].innerHTML;
        // product.product_summary = element.find("div [id*=dmusic_tracklist_player]");
        let reviews = element.find("div [id*=customer_review]");
        product.product_reviews = [];
        //save reviews html in array
        for (i = 0; i < reviews.length; i++) {
          let review = reviews[i];
          product.product_reviews.push($(review).find('div:nth-child(5)>span>div>div>span')[0].innerHTML.trim());
        }
        productDataAfterAJAX.push(product);
    })
}
