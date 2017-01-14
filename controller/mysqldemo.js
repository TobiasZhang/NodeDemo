/**
 * Created by TT on 2017/1/14.
 */
let router = require('express').Router();
let mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 2,
  host     : 'localhost',
  port     :  3306,
  user     : 'root',
  password : 'tt',
  database : 'find_you'
});

router.route('/').get((req,res) => {

  pool.query('SELECT * from user_info', function(err, rows, fields) {
    if (err) throw err;
    //console.log('The solution is: ', rows[0].solution);
     res.end(JSON.stringify(rows[0]))

  });



});
router.get('/a',(req,res) => {
  res.end(JSON.stringify({name:'李四',age: 20}));
});

module.exports = router;






