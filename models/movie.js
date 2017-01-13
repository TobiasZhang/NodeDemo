/**
 * Created by TT on 2017/1/12.
 */
var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  name: String,
  age: Number,
  meta: {
    createAt: {
      type: Date,
      default:Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});
MovieSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }
  next();
})
MovieSchema.statics = {
  findAll: function(callBack){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(callBack)
  },
  findByName: function(name,callback){
    return this
      .findOne({name:name})
      .exec(callback);
  }
}
//组装model类,第一个参数是表名（collection名）
var Movie = mongoose.model('Movie2',MovieSchema)

module.exports = Movie