var express = require('express');
var router = express.Router();
 
const dbConnection = require('../dbConnection')
const ObjectId = require('mongodb').ObjectId;

//CREATE un tweet
router.post('/', function (req, res, next) {
  console.log(req.body); //afficher dans la console 
  
  dbConnection(function (db) {
    db.collection('tweets')
        .insertOne({
          tweet: req.body.message,
          user: {
            id : new ObjectId("5e1700a893a5e856f10e40b6"),
            name : 'toto',
            avatar : '',
          },
          date: new Date(),
          likes: [],
          retweets: [],
          comments: []
        });
  }); 
    //réponse du serveur
    res.status(201).json({});
});

//CREATE COMMENTS
router.get('/:id/comments', function (req, res, next) {
    let comments = []
    MongoClient.connect(url, function (err, client) {
      if (err) {
        return
      }
      console.log('Connected successfully to server')
  
      const db = client.db(dbName)
  
        db.collection('tweets')
          .findOne({_id: new ObjectId(req.params.id)}, null, function (err, tweet) {
            tweet.comments.forEach(function (comment) {
              db.collection('tweets')
                .findOne({_id: comment}, null, function (err, tweetComment) {
                  console.log(err)
                  console.log(tweetComment)
                  comments.push(tweetComment)
                })
            })
  
            console.log(comments)
            res.render('comments', {comments: comments})
          })
      // client.close()
    })
  })

module.exports = router;