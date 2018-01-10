const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = __dirname + '/public';

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoDbUrl = 'mongodb://ronnilenvighansen:ronni721@ronni-shard-00-00-cif7m.mongodb.net:27017,ronni-shard-00-01-cif7m.mongodb.net:27017,ronni-shard-00-02-cif7m.mongodb.net:27017/ronnispillerguitar?ssl=true&replicaSet=Ronni-shard-0&authSource=admin';

app.use(express.static('public'));

app.use(express.static('staticFiles'));

app.use(bodyParser.urlencoded({extended : true}));

app.get('/comments', function(req, res)
{
    MongoClient.connect(mongoDbUrl, function (err, db)
    {
        var col = db.collection('comments');
        col.find().toArray(function (err, result)
        {
            res.json(result);
        });
        db.close;
    });
});

app.get('/comments/:id', function(req, res)
{    
    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        var col = db.collection('comments');     
        col.findOne({'_id' : ObjectId(req.params.id)}, function(err, result)
        {
            res.json(result);
        });
        db.close();
    });
});

app.post('/comments', function(req, res)
{    
    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        var col = db.collection('comments');    
        col.insertOne(req.body, function(err, result)
        {
            res.status(201);
            res.json({msg : 'Comment created'});
        });
        db.close();
    });
});

app.delete('/comments/:id', function(req, res)
{
    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        var col = db.collection('comments');
        col.deleteOne({'_id' : ObjectId(req.params.id)}, function(err, result)
        {
            res.json(result);
        });
        db.close();
    });
});

app.get('/login', function (req, res) 
{
    res.sendFile( path + 'login.html', function (err)
    {

    });
});

app.post('/login', function (req, res)
{
    if (req.body.user === 'user')
    {
        res.sendFile( path + 'verysecret.html', function (err)
        {
            
        })
    } else
    {
        res.sendFile( path + 'login.html', function (err)
        {

        });
    }
})

app.listen(3000);
