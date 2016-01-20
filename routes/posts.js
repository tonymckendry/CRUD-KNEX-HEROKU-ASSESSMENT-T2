var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Posts = function(){
  return knex('posts')
}


router.get('/', function(req, res, next) {
  Posts().select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/', function(req, res, next) {
  Posts().insert(req.body).then(function(){
    res.redirect('/');
  })
});

router.get('/:id', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.get('/:id/edit', function(req, res, next){
  Posts().where('id', req.params.id).first().then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.post('/:id', function(req, res, next) {
  Posts().where('id', req.params.id).first().insert(req.body).then(function(){
    res.redirect('/');
  })
});
router.post('/:id/delete', function(req, res, next) {
  Posts().where('id', req.params.id).first().delete().then(function(){
    res.redirect('/');
  })
});

module.exports = router;
