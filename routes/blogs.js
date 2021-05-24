const express = require('express');
const Article = require('../models/blog');

const router = express.Router();

router.get('/new', (req, res) => {
    res.render('posts/new');
});

router.get('/:id', (req, res) => {

})
router.post('/', async (req, res) => {
    const post = new Article({
        title: req.body.title,
        description: req.body.description
    });
    try {
        post = await post.save();
        res.redirect(`/posts/${post.id}`)
    } catch(err){
        res.render('posts/new', { post: post });
    } 
})


module.exports = router;