/**
 * Created by TT on 2017/1/12.
 */
var mongoose = require('mongoose')
var MovieSchema = require('../schemas/movie')
var Movie = mongoose.model('Movie',MovieSchema)

module.exports = Movie