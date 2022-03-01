const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
   title:String,
   description:String,
   director:String,
   distributor:String,
   duration:String,
   age:Number,
   link:String,
   rating:String,
   video:String,
   releaseDate:String,
   categorie:[{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Movie', movieSchema);