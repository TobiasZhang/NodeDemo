var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Movie = require('../models/movie')

mongoose.connect('mongodb://localhost/hehe');

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.findAll(function(err,movies){
    console.log('===================进来了============')
    if(err){
      console.log(err);
    }
    res.render('index', { title: 'Express',movies:movies });
  });
  //res.render('index', { title: 'Express',movies:[{_id:1,title:'大片1',img:'/images/test01.jpg'},{_id:333,title:'大片2',img:'/images/test02.jpg'},] });
});

module.exports = router;
