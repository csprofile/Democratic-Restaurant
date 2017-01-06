/*Importing resources*/
var express = require('express');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var dataMock = require('./dataMock.js');

/*Express settings*/
var app = express();
app.use(express.static('public'));

/*Body-parser settings*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/*DBMock settings*/
dataMock.wake();
dataMock.insertFakeData();

/*HTTP*/

app.get('/api/getCollection/:collection', function (req, res) {
    var collection = dataMock.selectAll(req.params.collection);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(collection));
});

app.get('/api/vote/dailyResult', function (req, res) {
    var reportResult = [];
    var now = dateFormat(new Date(), "shortDate");
    var votes = dataMock.selectAll('vote');

    for(var x = 0 ; x < votes.length ; x++){
        if(now === votes[x].date){
            var restaurantId = votes[x].restaurantId;

            if (restaurantId in reportResult) {
                reportResult[restaurantId].votes ++;
            }else{
                reportResult[restaurantId] = {};
                reportResult[restaurantId].votes = 1;
                reportResult[restaurantId].restaurant = dataMock.select('restaurant','id',restaurantId)[0];
            }
        }
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(reportResult));
});

app.post('/api/user/userLogin', function(req, res){
    
    var user = dataMock.select('user','login',req.body.login);
    var result = {};
    
    
    if(user.length > 0){
        if(user[0].pass === req.body.password){
            var now = dateFormat(new Date(), "shortDate");
            var votes = dataMock.select('vote','userId',user[0].id);
            var todaysVote = {};

            for(var x = 0 ; x < votes.length ; x++){
                if(now === votes[x].date){
                    todaysVote = votes[x];
                    break;
                }
            }
            
            result = {
                userId: user[0].id,
                userTodaysVote: todaysVote
            }
        }
    }







    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result));
});

app.post('/api/user', function(req, res){
    dataMock.insert('user',{
        login:req.body.login,
        pass:req.body.pass
    });

    res.status(201).send('New user created');
});

app.post('/api/restaurant', function(req, res){
    dataMock.insert('restaurant',{
        name:req.body.name,
        address:req.body.address
    });

    res.status(201).send('New restaurant created');
});

app.post('/api/vote', function(req, res){
    dataMock.insert('vote',{
        userId:req.body.userId,
        restaurantId:req.body.restaurantId,
        date:dateFormat(new Date(), "shortDate")
    });

    res.status(201).send('Vote registered');
});


/*Start server*/
app.listen(3000, function () {
    console.log('Running on port 3000!');
});