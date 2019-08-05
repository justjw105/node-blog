const path = require('path')
const express = require('express');
const expressEdge = require('express-edge');
const edge = require("edge.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");



//models
const Post = require('./database/models/Post');

//middleware
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

//controllers
const postControllers = require('./controllers/posts');
const userControllers = require('./controllers/users');
const homePageController = require('./controllers/homePage');


const app = new express();


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))


const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret:'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(connectFlash());
app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended:true
}));

app.set('views', __dirname+'/views');

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId);
    next();
});

//requests
app.get('/', homePageController);
//posts
app.get('/posts/new', auth, postControllers.create);
app.get('/posts/:id', postControllers.get);
app.post('/posts/store', storePost, postControllers.store);


app.get("/auth/logout", auth, userControllers.logout);
app.get('/auth/login', redirectIfAuthenticated, userControllers.login);
app.post('/users/login', redirectIfAuthenticated, userControllers.authenticate);
app.get('/auth/register', redirectIfAuthenticated, userControllers.create);
app.post('/users/register', redirectIfAuthenticated, userControllers.store);

app.get('/about', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.listen(4000, () => {
    console.log('App is listening on port 4000')
});
