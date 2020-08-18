On the server, add an image_alt column to the db (it should be the same as product_title)




v11

Works and gives the lowest price (not including Kindle)

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
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
          product.product_by = productBriefs[1];
        
          
          if(productBriefs[2] && isNaN(parseInt(productBriefs[3]))){
              productBriefs.splice(2, 2);
          } else {
            product.product_rating = productBriefs[2].split(' ')[0];
            product.total_ratings = productBriefs[3];
            product.main_format = productBriefs[4]; 
          }

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
          console.log('productBriefs: ',productBriefs)
          console.log('product: ',product);
    }
  }
}


-----------------------------
let products = document.querySelectorAll('.s-result-list div .sg-col-inner')
for (i = 0; i < products.length; i++) {
  console.log(products[i]);
}


v2

for (i = 0; i < products.length; i++) {
  console.log(products[i].querySelector('img'));
}


To grab the product data:

for (i = 0; i < products.length; i++) {
  console.log(products[i].innerText.split('\n'));

}

returns: one array per product:

0: "Product Roadmaps Relaunched: How to Set Direction while Embracing Uncertainty"
1: "by C. Todd Lombardo , Bruce McCarthy , et al."
2: "4.4 out of 5 stars"
3: " 96" (amount of ratings)
4: "Paperback"
5: "Other format: Kindle"


or 


0: "Best Seller"
1: "Principles of Product Management: How to Land a PM Job and Launch Your Product Career"
2: "by Peter Yang"
3: "4.5 out of 5 stars"
4: " 30" (amount of ratings)
5: "Kindle"
6: "$0.00"
7: "$0"
8: "."
9: "00  "
10: "Free with Kindle Unlimited membership Learn More"
11: "Or $8.99 to buy"
12: "Other format: Paperback"


or

0: "Digital Product Management Thinking: Integrating Analytics, Business Model, Coordination and Design Thinking"
1: "by Varun Nagaraj and Nitin Joglekar"
2: "4.3 out of 5 stars"
3: " 4"
4: "Kindle"
5: "$9.99"
6: "$9"
7: "."
8: "99"


or

0: "The Influential Product Manager: How to Lead and Launch Successful Technology Products"
1: "by Ken Sandy, Sean Pratt, et al."
2: "5.0 out of 5 stars"
3: " 9"
4: "Audible Audiobook"
5: "$0.00"
6: "$0"
7: "."
8: "00 "
9: "$24.95"
10: "$24.95"
11: "Free with Audible trial"
12: "Other formats: Kindle , Paperback"


EXAMPLES OF RESULTS FROM SINGLE ROW RESULTS
https://www.amazon.com/s?k=javascript&i=stripbooks-intl-ship&ref=nb_sb_noss_2

0: "Learning PHP, MySQL & JavaScript: With jQuery, CSS & HTML5 (Learning PHP, MYSQL, Javascript, CSS & HTML5)"
1: "by Robin Nixon"
2: "4.7 out of 5 stars"
3: " 97"
4: "Kindle"
5: "$24.99"
6: "$24"
7: "."
8: "99 "
9: "$42.99"
10: "$42.99"
11: "Paperback"
12: "More Buying Choices"
13: "$22.99 (36 used & new offers)"


OR

0: "Secrets of the JavaScript Ninja"
1: "by John Resig, Bear Bibeault, et al."
2: "4.6 out of 5 stars"
3: " 60"
4: "Audible Audiobook"
5: "$0.00"
6: "$0"
7: "."
8: "00 "
9: "$24.95"
10: "$24.95"
11: "Free with Audible trial"
12: "Paperback"
13: "$31.31"
14: "$31"
15: "."
16: "31  to rent"
17: "$44.99  to buy"
18: "More Buying Choices"
19: "$23.83 (13 used & new offers)


v4

Works on this Search: https://www.amazon.com/s?k=product+management&ref=nb_sb_noss
Not this: https://www.amazon.com/s?k=best&i=stripbooks-intl-ship&page=3&qid=1586695146&ref=sr_pg_3

let products = document.querySelectorAll('.s-result-list div .sg-col-inner');

for (i = 0; i < products.length; i++) {
  let product = {};
  let productBriefs = products[i].innerText.split('\n');
	
  if(productBriefs[0] == 'Best Seller'){
  	product.bestSeller = true;
  	productBriefs.splice(0, 1);
  } else {
  	product.bestSeller = false;
  }

  product.productTitle = productBriefs[0];
  product.productBy = productBriefs[1];
  product.productRating = productBriefs[2].split(' ')[0];
  product.totalRatings = productBriefs[3];
  product.mainFormat = productBriefs[4]; 

  for (y = 5; y < productBriefs.length; y++) {
  	if(productBriefs[y].includes('Other format')){
  		product.otherFormats = productBriefs[y]; 
  	}
  	if(productBriefs[y].includes('$') && !productBriefs[y]!='$0' && !productBriefs[y]!='$0.00'){
  		product.cost = productBriefs[y];
  	}	 
  }
  console.log('product: ', product);
}

----------------

The other format of results:

https://www.amazon.com/s?k=best&i=stripbooks-intl-ship&page=75&ref=nb_sb_noss

JavaScript: has 75 pages and stops there:

https://www.amazon.com/s?k=javascript&i=stripbooks-intl-ship&ref=nb_sb_noss_2

Navigate to Page 2 like so:

https://www.amazon.com/s?k=javascript&i=stripbooks-intl-ship&page=2

'NodeJS' has 39 pages

'HTML' has 75 pages:

https://www.amazon.com/s?k=html&i=stripbooks-intl-ship&ref=nb_sb_noss_2


----------------------------

Wide View Search Results: https://www.amazon.com/s?k=virtual+reality&ref=nb_sb_noss_2


-----------------------------------

For JS - 75-page Single Rows example:

https://www.amazon.com/s?k=javascript&i=stripbooks-intl-ship&ref=nb_sb_noss_2

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
let productBriefs = [];
for (i = 0; i < products.length; i++) {
  let product = {};
  if(products[i].innerText!=''){
    productBriefs.push(products[i].innerText.split('\n'));
    }	
}

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
let productBriefs = [];
for (i = 0; i < products.length; i++) {
  let product = {};
  if(products[i].innerText!=''){
    
    console.log('products[i]: ',products[i]);
    }
	
}


v6

Product Img and Info in same loop: (Works :)

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
let productBriefs = [];
for (i = 0; i < products.length; i++) {

  if(products[i].innerText!=''){
    let image = products[i].querySelector('img');
    if(image!= null){
      	  let product = {};
      	  let productBrief = products[i].innerText.split('\n');

    	  if(productBriefs[0] == 'Best Seller'){
		  	product.bestSeller = true;
		  	productBriefs.splice(0, 1);
		  } else {
		  	product.bestSeller = false;
		  }

		  product.productTitle = productBriefs[0];
		  product.productBy = productBriefs[1];
		  product.productRating = productBriefs[2].split(' ')[0];
		  product.totalRatings = productBriefs[3];

	      console.log('product: ',products[i]);
	      console.log('image:', image);
    }
  }
}



LOOP FROM THE OTHER SEARCH RESULTS PAGE FORMAT

for (i = 0; i < products.length; i++) {
  let product = {};
  let productBriefs = products[i].innerText.split('\n');
	
  if(productBriefs[0] == 'Best Seller'){
  	product.bestSeller = true;
  	productBriefs.splice(0, 1);
  } else {
  	product.bestSeller = false;
  }

  product.productTitle = productBriefs[0];
  product.productBy = productBriefs[1];
  product.productRating = productBriefs[2].split(' ')[0];
  product.totalRatings = productBriefs[3];
  product.mainFormat = productBriefs[4]; 

  for (y = 5; y < productBriefs.length; y++) {
  	if(productBriefs[y].includes('Other format')){
  		product.otherFormats = productBriefs[y]; 
  	}
  	if(productBriefs[y].includes('$') && !productBriefs[y]!='$0' && !productBriefs[y]!='$0.00'){
  		product.cost = productBriefs[y];
  	}	 
  }
  console.log('product: ', product);
}


v9 (logs the Image Element + the Product Object :):

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
for (i = 0; i < products.length; i++) {

  if(products[i].innerText!=''){
    let image = products[i].querySelector('img');
    if(image!= null){
      	  let product = {};
      	  let productBriefs = products[i].innerText.split('\n');

    	  if(productBriefs[0] == 'Best Seller'){
		  	product.bestSeller = true;
		  	productBriefs.splice(0, 1);
		  } else {
		  	product.bestSeller = false;
		  }

		  product.productTitle = productBriefs[0];
		  product.productBy = productBriefs[1];
          if(productBriefs[2]){
            product.productRating = productBriefs[2].split(' ')[0];
            product.totalRatings = productBriefs[3];
          }
		  
	      console.log('product: ',product);
	      console.log('image:', image);
    }
  }
}


------------------

Existing Server Variables

{product_title, product_by, product_cost, product_link, product_imgurl}

---------------------------------

Works beautifully :)

let products = document.querySelectorAll('.s-desktop-content div .sg-col-inner');
for (i = 0; i < products.length; i++) {

  if(products[i].innerText!=''){
    let image = products[i].querySelector('img');
  
    if(image!= null){
      	  let product = {};
      	  let productBriefs = products[i].innerText.split('\n');

    	  if(productBriefs[0] == 'Best Seller'){
		  	product.best_seller = true;
		  	productBriefs.splice(0, 1);
		  } else {
		  	product.best_seller = false;
		  }

		  product.product_title = productBriefs[0];
		  product.product_by = productBriefs[1];
        
          
          if(productBriefs[2] && isNaN(parseInt(productBriefs[3]))){
              productBriefs.splice(2, 2);
          } else {
            product.product_rating = productBriefs[2].split(' ')[0];
            product.total_ratings = productBriefs[3];
            product.main_format = productBriefs[4]; 
          }
		  product.product_imgurl = image.src;

          for (y = 5; y < productBriefs.length; y++) {
            if(productBriefs[y].includes('Other format')){
                product.other_formats = productBriefs[y]; 
            }
            if(productBriefs[y].includes('$') && !productBriefs[y]!='$0' && !productBriefs[y]!='$0.00'){
                product.product_cost = productBriefs[y];
            }	 
          }
        
          console.log('product: ',product);
    }
  }
}

-------------------
