var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Comments = function(){
  return knex('comments')
}


router.get('/:post_id/comments', function(req, res, next) {
  Comments().where('post_id', req.params.post_id).then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

router.post('/:post_id/comments', function(req, res, next) {
  Comments().insert(req.body).then(function(){
    res.redirect('/posts/' + req.params.post_id + '/comments' );
  })
});

router.get('/:post_id/comments/:id', function(req, res, next){
  Comments().where('id', req.params.id).first().then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.get('/:post_id/comments/:id/edit', function(req, res, next){
  Comments().where('id', req.params.id).first().then(function(result){
    res.json({'SUCCESS': result})
  })
})

router.post('/:post_id/comments/:id', function(req, res, next) {
  Comments().where('id', req.params.id).first().update(req.body).then(function(){
    res.redirect('/posts/' + req.params.post_id + '/comments');
  })
});
router.post('/:post_id/comments/:id/delete', function(req, res, next) {
  Comments().where('id', req.params.id).delete().then(function(){
    res.redirect('/posts/' + req.params.post_id + '/comments');
  })
});

module.exports = router;
