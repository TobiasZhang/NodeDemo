/**
 * Created by TT on 2017/1/12.
 */
var mongoose = require('mongoose');
var Movie = require('./movie');

var CountrySchema = new mongoose.Schema({
  name: String,
  movies : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

CountrySchema.statics = {
  findAll: function(callBack){
    return this
      .find({})
      .exec(callBack)
  },
  findByName: function(name,callback){
    return this
      .findOne({name:name})
      .exec(callback);
  }
}
//组装model类,第一个参数是表名（collection名）
var Country = mongoose.model('Country',CountrySchema)

module.exports = Country
