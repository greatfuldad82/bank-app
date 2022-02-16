const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// const url         = 'mongodb://localhost:27017';
const url         = 'mongodb+srv://bank-app:LDbncaZtkWg0FV7C@cluster0.nszsq.mongodb.net/myproject?retryWrites=true&w=majority';
let db = null;

//connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    if(err) {
        console.log('Connection to DB failed!', err);
        process.exit();
        return;
    }

    console.log('connected successfully to db server');

    //connect to my project database
    db = client.db('myproject');
});

//create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        collection.insertOne(doc, { w: 1 }, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

function update(userId, updateItem) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        console.log('User Object id', ObjectId(userId))
        collection.updateOne({ _id: ObjectId(userId) }, { $set: updateItem}, (err, result) => {
            if (err) {
                console.log({ err })
                reject('Update failed');
            }

           resolve(result)
        })
    })
}

//all users 
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            })
    })
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        db.collection('users').findOne({ email, password }, (err, result) => {
            if (err) {
                reject(err) 
            } else {
                resolve(result)        
            }
        }) 
    })
}

module.exports = { create, all, login, update };