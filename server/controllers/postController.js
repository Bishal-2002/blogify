const Post = require('../models/Post')
const jwt = require('jsonwebtoken')
const {cloudinary} = require('../cloudinary/setup')

module.exports.getAllPosts = async (req, res) => {
    res.json(await Post.find({})
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(10)
    )
}

module.exports.createPost = async (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, '123', {}, async(err, userInfo) => {
        if(err)     return res.status(404).json({'Message': 'Unauthorized Access Denied!'})
        try {
            const newPost = new Post({
                title: req.body.title,
                summary: req.body.summary,
                content: req.body.content,
                cover: {
                    path: req.file.path,
                    fileName: req.file.filename
                },
                author: userInfo.id
            })
            await newPost.save()
            res.json(newPost)
        }
        catch (err) { res.status(400).json(err) }
    })    
}

module.exports.getPost = async (req, res) => {
    try {
        const {id} = req.params
        const postDoc = await Post.findById(id).populate('author', ['username'])
        res.json(postDoc)
    }
    catch (err) { res.status(404).json(err) }
}

module.exports.updatePost = async (req, res) => {
    try {
        const {id} = req.params
        const postDoc = await Post.findByIdAndUpdate(id, {
            title: req.body.title,
            summary: req.body.summary,
            content: req.body.content
        })
        if(req.file) {
            postDoc.cover = {
                path: req.file.path,
                fileName: req.file.filename
            }
        }
        await postDoc.save()

        // deletes the old img from cloudinary
        if(req.body.oldImage)    await cloudinary.uploader.destroy(req.body.oldImage)

        res.json(postDoc)
    }
    catch(err) { res.status(400).json(err) }
}

module.exports.deletePost = async (req, res) => {
    try {
        const {id} = req.params
        const deletedPost = await Post.findByIdAndDelete(id)
        await cloudinary.uploader.destroy(deletedPost.cover.fileName)
        res.json('ok')
    }
    catch(err) {
        res.status(400).json(err)
    }
}