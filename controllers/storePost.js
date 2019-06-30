const Post = require("../database/models/Post");

module.exports = async (req, res) => {
    const { image } = req.files;
    console.log(image.name);/*
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error)=>{
        Post.create({
            ...req.body,
            image: '/posts/'+ image.name,
            createdBy: request.session.userId
        }, (error, post) => {
            res.redirect('/');
        });
    });*/
    res.redirect('/')
};


