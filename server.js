const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/post')
const methodOverride = require('method-override');

// Route file
const blogRouter = require('./routes/posts');

const app = express();




app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));

//app.use('/posts', blogRouter);


app.get('/', async (req, res) => {
    const blogs = await BlogPost.find().sort({ createdOn: 'desc'});
    res.render('posts/index', { blogs: blogs });
});

app.use('/posts', blogRouter);


app.listen(5000, () => {
    console.log('App is listening on port 5000');
});

