const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    path: String,
    fileName: String
})

const postSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: ImageSchema,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)