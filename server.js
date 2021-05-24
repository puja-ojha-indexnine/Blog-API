const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Route file
const blogRouter = require('./routes/blogs');

const app = express();

mongoose.connect('mongodb://localhost/27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));

//app.use('/posts', blogRouter);


app.get('/', (req, res) => {
    const blogs = [{
        title: "Test Blog 1",
        createdOn: new Date,
        description: 'Test Description 1'
    },
    {   
        title: "Test Blog 2",
        createdOn: new Date,
        description: 'Test Description 2'
    }]
    res.render('blogs/index', { blogs: blogs });
});


app.listen(5000, () => {
    console.log('App is listening on port 5000');
});

