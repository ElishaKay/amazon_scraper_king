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


---------------------------------

let asinnAndImageDetails = [];

for (i = 0; i < products.length; i++) {     
    let details = products[i].firstElementChild.firstElementChild.firstElementChild.href; 
    console.log(details)   
    asinnAndImageDetails.push(details);
}

successfully grabs product links :)

----------------------

For grabbing images:

for (i = 0; i < products.length; i++) {     
        let details = products[i].firstElementChild.firstElementChild.firstElementChild.innerHTML  
        console.log(details)   
        asinnAndImageDetails.push(details);
    }

successfully logs the html content of the image element. Looks like this:

<img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg" aria-hidden="true" class="" height="90" width="69" data-a-hires="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY180_.jpg" data-src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg"><noscript><img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51CMUOgy8HL._SY90_.jpg" height="90" width="69"></noscript>
