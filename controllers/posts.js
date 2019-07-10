const Post = require("../database/models/Post");

module.exports = {
  create: (req, res) => {
    if(req.session.userId) {
      res.render('create');
    }else{
      res.redirect('/auth/login/');
    }
  },
  get: async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render("post", {post});
  },
  store: async (req, res) => {
    const { image } = req.files;
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error)=>{
      Post.create({
        ...req.body,
        image: '/posts/'+ image.name,
        createdBy: request.session.userId
      }, (error, post) => {
        res.redirect('/');
      });
    });
    res.redirect('/')
  },
  list: async (req, res) => {
    const perPage = req.params.count;
    const pageNumber = req.params.page;
    //here I need to get specified number of posts starting at specified page

  }
}
