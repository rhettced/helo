require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      app = express(),
      {CONNECTION_STRING,SERVER_PORT,SESSION_SECRET} = process.env;

      const ctrl = require('./controller')


app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db',db);
    console.log('Party on Sports Fans')
})

//endpoints
app.get(`/api/posts/:id`, ctrl.getFilteredPosts);

app.get('/api/session',ctrl.getSession)
app.post('/api/register',ctrl.register);
app.post('/api/login',ctrl.login);
app.post(`/api/logout`,ctrl.logout);
app.get(`/api/posts`,ctrl.getAllPosts);
app.get(`/api/posts/:postid`,ctrl.getSinglePost);
app.post(`/api/posts`,ctrl.addPost);
app.delete(`/api/posts/:postid`,ctrl.deletePost);

app.listen(SERVER_PORT,console.log(`Bringing the wings to server ${SERVER_PORT}`));
