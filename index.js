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

app.get('/', function (req, res)
{
    res.sendFile(path + '/index.html', function (err)
    {

    });    
});

app.get('/index', function (req, res)
{
    res.sendFile(path + '/index.html', function (err)
    {

    });    
});

app.get('/videos', function(req, res)
{
    res.sendFile(path + '/videos.html', function (err)
    {

    });
});

app.get('/about', function(req, res)
{
    res.sendFile(path + '/about.html', function (err)
    {

    });
});

app.get('/comments', function(req, res)
{
    res.sendFile(path + '/comments.html', function (err)
    {

    });
});

app.get('/data', function(req, res)
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

app.post('/create', function(req, res)
{    
    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        db.collection('comments').insertOne(req.body, function(err, result)
        {
            db.close();
        });
    });
    res.redirect('/comments.html')
});

app.post('/update', function(req, res, next){
    
    var id = req.body.id;
    var comment = {
        name: req.body.name,
        comment: req.body.comment
    };

    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        db.collection("comments").updateOne({"_id" : ObjectId(id)}, comment, function(err, res) 
        {
            db.close();
        });
    });
    res.redirect('/comments.html');
});

app.post('/delete', function(req, res, next){
    var id = req.body.id;

    MongoClient.connect(mongoDbUrl, function(err, db)
    {
        db.collection('comments').deleteOne({"_id" : ObjectId(id)}, function(err, result)
        {
            db.close();
        });
    });
    res.redirect('/comments.html');
});


app.get('/login', function (req, res) 
{
    res.sendFile( path + '/login.html', function (err)
    {

    });
});

app.post('/login', function (req, res)
{
    if (req.body.user === 'user' && req.body.password === 'password')
    {
        res.sendFile( path + '/secret.html', function (err)
        {
            
        })
    } else
    {
        res.sendFile( path + '/login.html', function (err)
        {

        });
    }
})

app.listen(3000);
