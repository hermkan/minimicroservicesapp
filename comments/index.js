const express  = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const commentsByPostId = {}

function getAllComments (req, res, ) {
  res.send(commentsByPostId)
}

function getComments (req, res) {
 res.send(commentsByPostId[req.params.id] || [])
}

function createComment (req, res, next) {
 const commentId  =  randomBytes(4).toString('hex')
 const {content } = req.body
 const comments = commentsByPostId[req.params.id] || []
 comments.push({id: commentId, content})
 commentsByPostId[req.params.id] =  comments
 res.status(201).send(comments)
}



app.get("/posts/comments", getAllComments)
app.get("/posts/:id/comments", getComments)
app.post("/posts/:id/comments", createComment)

function activateServer(){
 console.log("Server activated!, listening on PORT 4001")
}
const PORT = 4001

app.listen(PORT, activateServer)