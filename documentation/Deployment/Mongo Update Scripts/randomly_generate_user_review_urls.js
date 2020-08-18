v5

db.blogs.find({ product_reviews: { $exists: true, $ne: [] }, reviewsWithURLs: { $exists: false } }).forEach((blog)=> { 
      console.log('blog.slug:', blog.slug)
       let counter = 0;
        db.users.aggregate([  
            { $sample: {size: blog.product_reviews.length} }, 
            { $match: {"popUser": true} } 
          ]).forEach((user)=> {
                db.blogs.update({_id: blog._id}, { $push: {"reviewsWithURLs": {
                    url: user.username, 
                    text: blog.product_reviews[counter]
                }}})
                counter++;
          })
});









v4: works perfectly :)


db.blogs.find({ product_reviews: { $exists: true, $ne: [] } }).limit(1).forEach((blog)=> { 
      console.log('blog.slug:', blog.slug)
      console.log('blog.product_reviews.length: ', blog.product_reviews.length);
      console.log('blog.product_reviews[0]: ',blog.product_reviews[0])
      let counter = 0;
        db.users.aggregate([  
            { $sample: {size: blog.product_reviews.length} }, 
            { $match: {"popUser": true} } 
          ]).forEach((user)=> {
                db.blogs.update({_id: blog._id}, { $push: {"reviewsWithURLs": {
                    url: user.username, 
                    text: blog.product_reviews[counter]
                }}})
                counter++;
          })
});



v1

db.blogs.find({ product_reviews: { $exists: true, $ne: [] } }).limit(1).forEach((blog)=> { 
      console.log('blog.slug:', blog.slug)
      console.log('blog.product_reviews.length: ', blog.product_reviews.length);
      blog.product_reviews.forEach((review, index)=> { 
          console.log('index: ', index)
          console.log('review: ', review)
    
       
    
        //   db.blogs.update({_id: blog._id}, { $push: {"reviewsWithURLs": {
        //         url: 'kailee_baker', 
        //         text: review
        //     }} 
    
    
          
      })
});


-------------------------

v2:

db.blogs.find({ product_reviews: { $exists: true, $ne: [] } }).limit(1).forEach((blog)=> { 
      console.log('blog.slug:', blog.slug)
      console.log('blog.product_reviews.length: ', blog.product_reviews.length);
      blog.product_reviews.forEach((review, index)=> { 
          console.log('index: ', index)
          console.log('review: ', review)
          
          db.users.aggregate([  
            { $sample: {size: blog.product_reviews.length} }, 
            { $match: {"popUser": true} } 
          ]).forEach(function(user,i) {
       
    
        //   db.blogs.update({_id: blog._id}, { $push: {"reviewsWithURLs": {
        //         url: 'kailee_baker', 
        //         text: review
        //     }} 
    
    
          
      })
});

---------------------------------


v3


