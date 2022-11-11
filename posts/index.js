const express  = require('express')
const {randomBytes} = require('crypto')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const posts = {}

function getPosts (req, res) {
 res.send(posts)
}

function createPost (req, res, next) {
 const id  =  randomBytes(4).toString('hex')
 const {title} =  req.body
 posts[id] = {id, title}
 res.status(201).send( posts[id])
}


app.get("/posts", getPosts)
app.post("/posts", createPost)

function activateServer(){
 console.log("Server activated!, listening on PORT 4000")
}
const PORT = 4000

app.listen(PORT, activateServer)