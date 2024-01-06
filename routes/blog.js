const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const {Blog} = require("../models/blog")
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + `${file.originalname}`;
      cb(null, filename)
    }
  });

  const upload = multer({ storage: storage }) 

router.get('/add-blog',(req,res) =>{
    res.render('addblog',{
        user:req.user
    });
});

router.post("/",upload.single('coverImage'), async (req,res) =>{
    const {title,description} = req.body;
    const blog = await Blog.create({
        title,
        body:description,
        createdBy: req.user._id,
        coverImgURL: `/uploads/${req.file.filename}`,
    });
    res.redirect(`/blog/${blog._id}`);
});


module.exports = router;