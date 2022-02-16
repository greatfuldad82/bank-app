var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');

//used to serve static files from public directory 
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

//create user account 
app.get('/account/create/:name/:email/:password', function (req, res) {
    //else create user
    dal.create(req.params.name, req.params.email, req.params.password).then((user) => {
        console.log(user);
        res.send(user);
    })
})

//login
app.get('/account/login/:email/:password', function (req, res, next) {
    dal.login(req.params.email, req.params.password).then((user) => {
        console.log(user);

        // if user exists in DB, we are able to move to next middleware
        next()
    })
}, (req, res) => {
    console.log("user succesfully logged in!")
})
 
app.post('/account/my-login', function(req, res, next) {
    dal.login(req.body.email, req.body.password).then((user) => {
        res.json(user);
    })
})
//all accounts
app.get('/account/all', function (req, res) {
   dal.all().
        then((docs) => {
            // console.log(docs);
            res.send(docs);
        });
}); 

// update account
app.put('/account/update/:userId', function (req, res) {
    const userId = req.params.userId;

    const body = req.body;

    if (Object.keys(body).length === 0) {
        return res.send( {success: false, message: 'No update item passed'})
    }

    dal.update(userId, body).then(message => {
        res.send({ success: true, message })
    }).catch(err => {
        console.log('Error ', err);
        res.send({ success: false, message: 'Update failed'})
    })
})

var port = process.env.PORT || 3001;
app.listen(port);
console.log('running on port: ' + port);