

db.blogs.updateMany({search_keyword: 'Stephen King'},{ $push: { reviewedBy: ObjectId("5eaad03f83ac6b2c301554ba") } } )

 db.users.find({popUser: true}).forEach(function(user,i) {
    e.product_imgurl=e.product_imgurl.replace(/.jpg/g, ".SL375.jpg")
    db.users.save(user);
});



v2

Name begins with an A

let count =0;

 db.users.find({popUser: true, name: /^A/}).forEach(function(user,i) {
   console.log('user._id: ',user._id)
   count++;
   console.log('count: ',count)
   console.log('user.name: ',user.name)
});


v3

Success :)

Selecting all the users that start with the letter A. Then we take all the Warren buffet books and stuff those Warren Buffet books into their blogs.reviewedBy Record - hence - for all users that begin with the letter 'A', their public profile will show all the books scraped from the keyword 'Warren Buffet'



let count =0;

 db.users.find({popUser: true, name: /^A/}).forEach(function(user,i) {
   console.log('user._id: ',user._id)
   count++;
   console.log('count: ',count)
   console.log('user.name: ',user.name)
   db.blogs.updateMany({search_keyword: "Warren Buffett"},{ $push: {reviewedBy: ObjectId(user._id)} } )
});


v4


Perfection: generates a unique combination of purchases for each user :)

db.users.aggregate([  
        { $sample: {size: 100} }, 
        { $match: {"popUser": true} } 
      ]).forEach(function(user,i) {
        db.blogs.aggregate([  
                    { $sample: {size: 20} }
                  ]).forEach(function(blog,i) {
                      db.blogs.update(
                        {"_id" : blog._id},
                        {$push: {reviewedBy: ObjectId(user._id)}});


                     console.log('user.username:'user.username)
            }) 
})
      
same thing:




db.users.aggregate([  
        { $sample: {size: 2000} }, 
        { $match: {"popUser": true, reviewedBy: { $exists: false } } } 
      ]).forEach(function(user,i) {
        db.blogs.aggregate([  
                    { $sample: {size: 20} }
                  ]).forEach(function(blog,i) {
                      db.blogs.update(
                        {"_id" : blog._id},
                        {$push: {reviewedBy: ObjectId(user._id)}});


                     console.log('user.username:'user.username)
            }) 
})
      
      
      
     
      
     