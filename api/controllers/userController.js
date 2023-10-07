const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    try {
        const {username, password} = req.body
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = new User({
            username: username,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch(e) {
        console.log(e)
        res.status(400).json(e)
    }
} 

module.exports.login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if(!user)   return res.status(401).json({'message': 'Incorrect username'})
    const isSamePass = await bcrypt.compare(password, user.password)
    if(!isSamePass)     return res.status(401).json({'message': 'Incorrect username or password'})
    jwt.sign({username, id: user._id}, '123', {}, (err, token) => {
        if(err)     return res.status(401).json(err)
        res.cookie('token', token).json({
            id: user._id,
            username
        })
    })
}

module.exports.logout = (req, res) => {
    res.cookie('token', '').json('ok')
}

module.exports.profile = (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, '123', {}, (err, info) => {
        if(err)     res.status(401).json({'message': 'Invalid token'})
        else res.status(200).json(info)
    })
}