var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;
//schema
var bookSchema = new mongoose.Schema({
    "name" : String,
    "author" : String,
    "publish" : String,
    "publishdate" : Date,
    "page":  Number,
    "price":Number,
    "content":String
});

//model
var Book = mongoose.model("Book",bookSchema);
// Book.create({"name" : '笑傲江湖',
// "author" : '金庸',
// "publish" : '江湖出版社',
// "publishdate" : '2010-5-4',
// "page":  350,
// "price":50,
// "content":'江湖恩怨'});

module.exports = Book;
