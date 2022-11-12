const express = require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')

const axios = require('axios')
const app = express()
app.use(express.json())
app.use(cors())
const posts = {}

function getPosts (req, res) {
 res.send(posts)
}

async function createPost  (req, res) {
 const id  =  randomBytes(4).toString('hex')
 const {title} =  req.body
 posts[id] = {id, title}
 await axios.post('http://localhost:4005/events', {type: 'PostCreated', data:{
  id, title
 }})
 res.status(201).send( posts[id]) 
}

function eventHandler (req, res,) {
console.log('Received event', req.body.type);
res.send({})
}
app.get('/posts', getPosts)
app.post('/posts', createPost)
app.post('/events', eventHandler)


function activateServer(){
 console.log("Post service activated!, listening on PORT 4000")
}
const PORT = 4000

app.listen(PORT, activateServer)