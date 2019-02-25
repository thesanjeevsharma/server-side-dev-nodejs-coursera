const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbo = require('./operations');

// DB CONFIG
const url = 'mongodb://sdirectdb:sdirectdb@192.168.0.5:27017/sdirectdb';
const dbname = 'sdirectdb';

MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {

    console.log('MongoDB connected...');
    const db = client.db(dbname);

    dbo.insertDocument(db, { name: "Maggie", description: "Ready in 2 mins"}, "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);
            return dbo.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);
            return dbo.updateDocument(db, { name: "Maggie" }, { description: "Not ready in 2 mins" }, "dishes");
        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);
            return dbo.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);          
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);
            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));