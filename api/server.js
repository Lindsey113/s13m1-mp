// BUILD YOUR SERVER HERE
const express = require('express')
const server = express()
const User = require('./users/model')

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                err: err.message
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                err: err.message
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    User.update(req.params.id)
        .then(user => {
            if(!user){
                res.status(404).json({
                    message: "The user with the specified ID does not exist"
                })
            } else if(!user.name || !user.bio){
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                User.update(req.params.id, req.params.body)
            }
        })
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
