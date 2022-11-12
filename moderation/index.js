const express  = require('express')
const axios =  require('axios')
const app = express()
app.use(express.json())

async function moderator (req, res){
 const {type, data} = req.body
 if (type === 'commentCreated'){
  const status = data.content.includes('orange') ? 'rejected': 'approved'
  await axios.post('http://localhost:4005/events', {type: 'commentModerated', data:{
   id: data.id, postId: data.postId, status, content: data.content
  }})
 }
 res.send({})
}

app.post('/events', moderator)
function activateServer(){
 console.log("Moderation service activated!, listening on PORT 4003")
}


const PORT = 4003

app.listen(PORT, activateServer)