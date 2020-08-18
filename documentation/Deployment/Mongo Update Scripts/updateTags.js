works within the noSQLBooster Native Shell (ObjectID should be the ID of the tag that was created via the Admin tab.)

db.blogs.updateMany({search_keyword: 'nodejs'},{ $push: { tags: ObjectId('5ea2fa24764ba838c67ba395') } } )
 

// const Blog = require('../../../backend/models/blog');

// // let arrayOfCategories = ['5e85d61409a9291f30e6b9ae'];
// let arrayOfTags = ['5e85d64a09a9291f30e6b9af'];

// Blog.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
//     (err, result) => {
//         if (err) {
//             // return res.status(400).json({
//             //     error: errorHandler(err)
//             // });
//         } else {
//             console.log('succesfully saved product: ', newPost.title);
//         }
//     }
// );

background-image:url(https://m.media-amazon.com/images/I/71vYDnPI5rL




db.blogs.find({search_keyword:"css"}).forEach(function(e,i) {
    e.product_imgurl=e.product_imgurl.replace(/.jpg/g, ".SL375.jpg")
    db.blogs.save(e);
});


db.blogs.find({}).forEach(function(e,i) {
    e.product_imgurl=e.product_imgurl.replace(/.jpg/g, ".SL375.jpg")
    db.blogs.save(e);
});

//..SL375.SL375.SL375//.jpg