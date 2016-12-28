var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/bms');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'数据库连接错误:'));
db.once('open',function(){
 console.log('数据库成功连接！！')
});
module.exports=db;
