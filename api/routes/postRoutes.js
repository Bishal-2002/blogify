const express = require('express')
const router = express.Router()
const {storage} = require('../cloudinary/setup')
const multer = require('multer')
const uploadMiddleware = multer({storage})
const postController = require('../controllers/postController')

router.route('/')
    .get(postController.getAllPosts)
    .post(uploadMiddleware.single('image'), postController.createPost)

router.route('/:id')
    .get(postController.getPost)
    .put(uploadMiddleware.single('newImage'), postController.updatePost)
    .delete(postController.deletePost)

module.exports = router