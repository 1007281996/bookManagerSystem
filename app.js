var express=require('express');
var app=express();
var router=require('./router/router.js');
var db=require('./model/db.js');
var session=require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.set('view engine','ejs');
app.use(express.static('./public'));
app.get('/',router.showLogin);
app.get('/login',router.showLogin);
app.post('/doLogin',router.doLogin);
app.get('/index',router.showIndex);
app.post('/bookList',router.bookList);
app.post('/saveOrUpdate',router.saveOrUpdate);
app.post('/delete',router.delete);


app.listen(3003);
