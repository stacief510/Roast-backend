var db = require('../models');

var posts = [
  { name:"Vanilla Latte",
    store:"Peets Coffee & Tea",
    review_title:"Delicious. Not too sweet",
    review:"This is my favorite drink. The vanilla they use is not too sweet and just adds something to the flavor of the espresso.",
    rating: 5,
    drink_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    user_id: null,
  },
  { name:"Iced Mint Mojito",
    store:"Philz Coffee",
    review_title:"Minty Sweet",
    review:"I really like this drink! The mint is such a nice touch, something different most coffee shops have never done before.",
    rating: 3,
    drink_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    user_id: null,
  },
  { name:"Espresso",
    store:"Blue Bottle",
    review_title:"Best espresso in the west.",
    review:"Blue Bottle's espresso is nutty and not bitter at all. Smooth and easy to drink, and enjoyable!",
    rating: 5,
    drink_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    user_id: null,
  },
  { name:"Coffee",
    store:"Peets Coffee & Tea",
    review_title:"Major Dickason's Blend",
    review:"I love Dark Roasts. This coffee is rich, smooth, and complex, with a very full body and multi-layered character.",
    rating: 4,
    drink_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    user_id: null,
  },
  { name:"Coffee",
    store:"Bluestone Lane",
    review_title:"Fruity Coffee",
    review:"This coffee is bitter and fruity at the same time. I am not a huge fan of fruitty coffee so I wouldn't recommend this blend.",
    rating: 1,
    drink_photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG',
    user_id: null,
  }
]

var users=[{name: "Stacie", email:"sf@ga.co", password: "1234", current_city: "Danville, CA", user_photo: "https://avatars0.githubusercontent.com/u/25073116?s=460&v=4"},
    {name: "Joe", email:"joe@ga.co", password: "123", current_city: "San Francisco, CA", user_photo: "https://unsplash.com/photos/f5_eOC2FDwk"}];

db.User.remove({}, function(err, removedUsers){
    db.User.create(users, function(err, createdUsers){
        posts.forEach(post => {
            post.user_id = createdUsers[0]._id;
        })

    db.Post.remove({}, function(err, removedPosts) {
        db.Post.create(posts, function (err, createdPosts) {
            console.log('You created drink reviews!', createdPosts);
            process.exit();
        });
    });

    });
});