const express = require('express');
const BlogPost = require('../models/post');


const router = express.Router();


router.get('/new', (req, res) => {
    res.render('posts/new', { blog: new BlogPost() });
});

router.get('/edit/:id', async (req, res) => {
    const blog = await BlogPost.findById(req.params.id);    
    res.render('posts/edit', { blog: blog });
});

router.get('/:slug', async (req, res) => {
    const blog = await BlogPost.findOne({ slug: req.params.slug })
    if(blog == null ){
        res.redirect('/')
    }
    res.render('posts/show', { blog: blog })
})

router.post('/', async (req, res, next) => {
    req.blog = new BlogPost();
    next();
}, saveBlogAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.blog = await BlogPost.findById(req.params.id);
    next();

}, saveBlogAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveBlogAndRedirect(path) {
    return async (req, res) => {
        let blog = req.blog
            blog.title = req.body.title
            blog.description = req.body.description
            blog.markdown = req.body.markdown

        try {
            blog = await blog.save();
            res.redirect(`/posts/${blog.slug}`)
    
        } catch (err){
            console.log(err);
            res.render(`posts/${path}`, { blog: blog });
        } 
    }
}
module.exports = router;