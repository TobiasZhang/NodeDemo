/**
 * Created by TT on 2017/1/12.
 */
var mongoose = require('mongoose');
var Country = require('./country');
var MovieSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country : { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
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
  },
  findAll2: function(callBack){
    return this
      .find({country:{$exists:true}})
      .populate({
        path: 'country',
        match: { name: '英国'},
        select: 'name -_id',
        // options: { limit: 5 }
      })
      .exec(callBack)
  }
}
//组装model类,第一个参数是表名（collection名）
var Movie = mongoose.model('Movie',MovieSchema)

module.exports = Movie