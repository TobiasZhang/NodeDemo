var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',movies:[{_id:1,title:'大片1',img:'/images/test01.jpg'},{_id:333,title:'大片2',img:'/images/test02.jpg'},] });
});

module.exports = router;
