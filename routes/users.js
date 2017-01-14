var express = require('express');
var router = express.Router();
//用underscore.extend可以将新对象数据赋值到旧对象上
var underscore = require('underscore');

var Movie = require('../models/movie')
var Country = require('../models/country')


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
    },
    country: ''
  });
});
//增
router.post('/add', function(req, res) {
  console.log('==============='+JSON.stringify(req.body)+'===============');
  var id = req.body.movie._id;
  var newMovie = req.body.movie;
  var country = req.body.country;
  var _movie;

  _country = new Country({
    name:country
  });
  _country.save(function(err,country){
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
        age:newMovie.age,
        country:country._id
      });
      //保存至mongodb
      _movie.save(function(err,movie){
        if(err){
          console.log(err)
        }
        console.log('=======存入成功！=======')
      });
    }
  });


  res.redirect("/")
});
//查
router.get('/query', function(req, res, next) {
  let condition = res.body;
  Movie.findAll2(function(err,movies){
    if(err){
      console.log(err);
    }
    movies.forEach(item => console.log(JSON.stringify(item)));
    res.render('index', { title: 'Express',movies:movies });
  });
});
//path:/users/:id 路径上的参数通过 req.params.id取得
//删
router.delete('/', function(req, res, next) {
  let id = req.query.id;
  if(id)
    Movie.remove({_id:id},function(err){
      if(err)
        console.log(err);
      else
        res.json({success:1})
    })
});

module.exports = router;
