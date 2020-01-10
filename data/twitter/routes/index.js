var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'twitter';
 
 
//Connection à la DB
const dbConnection = function (callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      return
    }
    console.log("Connecté au serveur");
    
    const db = client.db(dbName);
    
    callback(db);
    
    client.close();
  });
}
 
//Fonction pour afficher des documents
const findTweets = function (db, callback) {
  db.collection('tweets')
    .find({})
    .toArray(function (err, docs) {
      //console.log(docs)
      callback(docs)
    });
}
 
//Utilisation des fonctions
//Trouver et Afficher des tweets
router.get('/', function (req, res, next) {
  dbConnection(function (db) {
    findTweets(db, function (tweets) {
      console.log(tweets)
      res.render('index', { title: 'TWITTER', posts: tweets, user:req.session.me }); //
    });
  });
})


//READ lié à dbconnection
router.get('/', function(req, res, next) {  
  console.log(req.session)
  //vérifie que ma session a fonctionné  const findTweets = function(db, callbackTweets) {
    const collection = db.collection('tweet');
    collection.find({}).toArray(function(err, tweets) {
      if(err){
        return
      }
      console.log("J'ai trouvéééééé");
      callbackTweets(tweets);
    });
  });

module.exports = router;
