const express  = require('express')
const cors =  require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

function sendPost(req, res) {
 res.send(posts)
}

function eventHandler (req, res,) {
 const {type, data} = req.body
 if (type === 'PostCreated'){
  const {id, title} =  data
  posts[id] = {id, title, comments: []}
 }
 if (type === 'commentCreated'){
  const {id, content, postId, status} = data
  const post = posts[postId]
  post.comments.push({id, content, status})
 }
 console.log(posts)
 res.send({})
}

function activateServer(){
 console.log("Query service activated!, listening on PORT 4002")
}

app.get('/posts',sendPost)
app.post('/events', eventHandler)

const PORT = 4002

app.listen(PORT, activateServer)