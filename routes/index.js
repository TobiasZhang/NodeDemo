var express = require('express');
var router = express.Router();
var io = require('socket.io');

//操作mongodb的模块
var mongoose = require('mongoose');
var Movie = require('../models/movie')
//连接mongodb数据库,port不加默认27017，整个应用只调用一次连接
mongoose.connect('mongodb://localhost/hehe');

router.preparedSocketIO = function (server) {
  var _io = io.listen(server);
  _io.sockets.on('connection',function(socket){
    //new connection 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('新连接connect: ' +
      socket.remoteAddress + ':' + socket.remotePort);
    //socket.setEncoding('binary');
      socket.on('disconnect', function(){
        console.log('---客户端断开连接---');
      });
    //数据错误事件
    socket.on('error',function(exception){
      console.log('---客户端异常断开---')
      console.log('socket error:' + exception);
      socket.end();
    });
    //自定义事件
    socket.on('customclick', function(data) {
      socket.emit('autoreply',{msg:'你才是'+data.msg})
      console.log(socket.remoteAddress+'--customclick--:'+data.msg)
    });
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.findAll(function(err,movies){
    if(err){
      console.log(err);
    }
    movies.forEach(item => console.log(JSON.stringify(item)));
    res.render('index', { title: 'Express',movies:movies });
  });
  //res.render('index', { title: 'Express',movies:[{_id:1,title:'大片1',img:'/images/test01.jpg'},{_id:333,title:'大片2',img:'/images/test02.jpg'},] });
});


router.get('/chat', function(req, res, next) {
  res.render('hehe');
});



module.exports = router;
