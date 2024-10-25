const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT

app.use(express.json())

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/style.css', (req,res) => {
  res.sendFile(path.join(__dirname + '/style.css'));
})

app.put('/submit', (req,res) => {
  console.log('body',req.body)
  res.json({message:'ok'})
})

app.get('/app.js', (req,res) => {
  res.sendFile(path.join(__dirname + '/app.js'));
})

console.log(`PLANNING TO USE PORT: ${port}`)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port: ${port}`))