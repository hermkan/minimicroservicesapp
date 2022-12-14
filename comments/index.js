const express  = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

function getComments (req, res) {
 res.send(commentsByPostId[req.params.id] || [])
}

async function createComment (req, res) {
 const commentId  =  randomBytes(4).toString('hex')
 const {content } = req.body
 const comments = commentsByPostId[req.params.id] || []
 comments.push({id: commentId, content, status: 'pending'})
 commentsByPostId[req.params.id] =  comments
 await axios.post('http://localhost:4005/events', {type: 'commentCreated', data:{
  id : commentId, postId: req.params.id,  content, status: 'pending'
 }})
 res.status(201).send(comments)
}

async function eventHandler (req, res) {
console.log('Received event', req.body.type);
const {type, data} =  req.body
if(type === 'commentModerated'){
 const {postId, id, content, status} = data
 const comments = commentsByPostId[postId]
 const comment = comments.find(comment => {
  return comment.id === id
 })
 comment.status = status
 await axios.post('http://localhost:4005/events', {type:'commentUpdated', data:{
  id, content, status, postId
 }})
}
res.send({})
}

app.get('/posts/:id/comments', getComments)
app.post('/posts/:id/comments', createComment)
app.post('/events', eventHandler)

function activateServer(){
 console.log("Comment service activated!, listening on PORT 4006")
}
const PORT = 4006

app.listen(PORT, activateServer)