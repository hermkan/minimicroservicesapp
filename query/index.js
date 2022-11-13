const express  = require('express')
const cors =  require('cors')
const axios = require('axios')
const app = express()
app.use(cors())
app.use(express.json())

const posts = {}

function handleEvent (type, data){
 if (type === 'PostCreated'){
  const {id, title} =  data
  posts[id] = {id, title, comments: []}
 }

 if (type === 'commentCreated'){
  const {id, content, postId, status} = data
  const post = posts[postId]
  post.comments.push({id, content, status})
 }

 if (type === 'commentUpdated'){
  const {id, content, postId, status} = data
  const post = posts[postId]
  const comment = post.comments.find(comment => comment.id === id)
  comment.status = status
  comment.content = content
 }
}
function sendPost(req, res) {
 res.send(posts)
}

function eventHandler (req, res,) {
 const {type, data} = req.body
 handleEvent(type, data)
 res.send({})
}

function activateServer(){
 console.log("Query service activated!, listening on PORT 4002")
}
// async function getEvents (){
//  const response = await axios.get('http://localhost:4005/events')
//  for (let event of response.data){
//   console.log('Processing event', event.type);
//   handleEvent (event.type, event.data)
//  }
// }

app.get('/posts',sendPost)
app.post('/events', eventHandler)

const PORT = 4002

// app.listen(PORT, activateServer, getEvents)
app.listen(PORT, async ()=> {
console.log("Query service activated!, listening on PORT 4002")
const response = await axios.get('http://localhost:4005/events')
 console.log(response.data);
 for (let event of response.data){
  console.log('Processing event', event.type);
  handleEvent (event.type, event.data)
 }
})