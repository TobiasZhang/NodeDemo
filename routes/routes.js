/**
 * Created by TT on 2017/1/14.
 */

module.exports =  function(app) {
  app.use('/', require('./../controller/index'));
  app.use('/users', require('./../controller/users'));
  app.use('/mysql', require('./../controller/mysqldemo'));
}