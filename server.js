const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
//DB
const MongoClient = require('mongodb').MongoClient;
var db;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

MongoClient.connect('mongodb+srv://plakor:!q2w3e4r@cluster0.dnh1o.mongodb.net/plakorvrs?retryWrites=true&w=majority', { useUnifiedTopology: true }, function(error, client){     //테스트용 DB
  if (error) return console.log(error);
  db = client.db('plakorvrs');

  app.listen('8080', function(){
    console.log('WebServer listening on 8080');
  });
});

app.use(express.static(path.join(__dirname, 'plakorvrs/build')));

app.post('/register', (req,res)=>{
    
    var param = req.body;

    console.log(param);

    db.collection('reservation').insertOne(param);

    console.log("Success");
    res.json({OUT_MSG : "SUCCESS"})
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/plakorvrs/build/index.html'));
});

