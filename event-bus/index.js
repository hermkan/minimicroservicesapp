const express  = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())

function eventHandler  (req, res) {
 const event = req.body
 axios.post('http://localhost:4000/events',event)
 axios.post('http://localhost:4006/events',event)
 axios.post('http://localhost:4002/events',event)
 axios.post('http://localhost:4003/events',event)
 res.send({status: 'OK'})
}

app.post('/events', eventHandler)

function activateServer(){
 console.log("Event bus activated!, listening on PORT 4005")
}
const PORT = 4005
app.listen(PORT, activateServer)