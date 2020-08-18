everything works except for 'Product Roadmaps Relaunched: How to Set Direction while Embracing Uncertainty'
which returns: https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/grey-pixel.gif
instead of: 

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


---------------------------------

let asinnAndImageDetails = [];

for (i = 0; i < products.length; i++) {     
    let details = products[i].firstElementChild.firstElementChild.firstElementChild.href; 
    console.log(details)   
    asinnAndImageDetails.push(details);
}

successfully grabs product links :)

----------------------

let imgURLs = [];
for (i = 0; i < products.length; i++) {     
        let details = products[i].firstElementChild.firstElementChild.firstElementChild.innerHTML;
        let imgURL = details.split("\"")[3];  
        console.log(imgURL)   
        imgURLs.push(imgURL);
    }


successfully grabs image urls :)


------------------------
let asinnAndImageDetails = [];

for (i = 0; i < products.length; i++) {
        
        let details = products[i].firstElementChild.innerHTML  
        console.log(details)   
        asinnAndImageDetails.push(details);
    }

logs:


                
<div class="item-view-left-col-inner">

    <a class="a-link-normal" href="/gp/product/1118987241/ref=ppx_yo_dt_b_asin_image_o00_s01?ie=UTF8&amp;psc=1">
        
<img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51oxMESgmbL._SY90_.jpg" aria-hidden="true" onload="if (typeof uet == 'function') { uet('cf'); uet('af'); }" class="yo-critical-feature" height="90" width="72" title="Professional WordPress: Design and Development" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/51oxMESgmbL._SY180_.jpg">

    </a>
</div>



-------------------
For grabbing images:

for (i = 0; i < products.length; i++) {     
        let details = products[i].firstElementChild.firstElementChild.firstElementChild.innerHTML  
        console.log(details)   
        asinnAndImageDetails.push(details);
    }

successfully logs the html content of the image element. Looks like this:

<img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg" aria-hidden="true" class="" height="90" width="69" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY180_.jpg" data-src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg"><noscript><img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg" height="90" width="69"></noscript>
