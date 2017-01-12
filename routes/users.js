var express = require('express');
var router = express.Router();
//用underscore.extend可以将新对象数据赋值到旧对象上
var underscore = require('underscore');

var Movie = require('../models/movie')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/toAdd', function(req, res, next) {
  res.render('add', {
    title: 'Express',
    movie: {
      name: '',
      age: ''
    }});
});
//增
router.post('/add', function(req, res) {
  console.log('==============='+JSON.stringify(req.body)+'===============');
  var id = req.body.movie._id;
  var newMovie = req.body.movie;
  var _movie;
  if(id){//若name已存在
    Movie.findByName(name,function(err,movie){
      if(err){
        console.log(err)
      }
      //融合新旧对象
      _movie = underscore.extend(movie,newMovie);
      //保存至mongodb
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        console.log('=======修改成功！=======')
      });
    })
  }else{
    _movie = new Movie({
      name:newMovie.name,
      age:newMovie.age
    });
    //保存至mongodb
    _movie.save(function(err,movie){
      if(err){
        console.log(err)
      }
      console.log('=======存入成功！=======')
    });
  }
  res.redirect("/")
});

module.exports = router;
