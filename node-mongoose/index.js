const mongoose = require('mongoose');

const Dishes = require('./models/dish.model');

// DB Connection
const connect = mongoose.connect(require('./config/keys').MongoURI, { useNewUrlParser: true });

connect.then((db) => {

    console.log('MongoDB connected via Mongoose...');

    Dishes.create({
        name: 'Italian Pizza',
        description: 'Best in the world!'
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Truly best in the world!'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'Oh Man! You should try this.',
            author: 'Rami Malek'
        });
        return dish.save();
    })
    .then((dish) => {
        console.log(dish);
        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });
});