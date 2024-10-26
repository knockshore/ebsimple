const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT
const pg = require('pg')

const { Client } = pg;
const client = new Client({
  connectionString: process.env.DATABASE_URL
})

client.connect().then(() => console.log("Connected to db"))
.catch(e => console.log(e))

app.use(express.json())

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/questions', async (req,res) => {
  try {

    const qres = await client.query(`
      SELECT uuid FROM aws_questions
      WHERE uuid NOT IN (
        SELECT question_uuid FROM answers
        ) LIMIT 1
    `)
    const result = await client.query('SELECT * FROM aws_questions')  
    // console.log(qres.rows)
    res.json({ 
      question_index: qres.rows[0].uuid,
      questions: result.rows
    })
  } catch (e) {
    console.log(e)
    res.status(500).send('Something went wong bub')
  }
})

app.get('/style.css', (req,res) => {
  res.sendFile(path.join(__dirname + '/style.css'));
})

app.put('/submit', async (req,res) => {
  const { uuid, selected } = req.body;
  console.log('uuid,selected', uuid, selected)
  try {

    const result = await client.query(`INSERT INTO answers(question_uuid, choice) VALUES('${uuid}','${selected.toUpperCase()}')`)  
    const ansres = await client.query(`SELECT * FROM aws_questions WHERE uuid = '${uuid}'`)  
    console.log('insert', result)
    res.json({message:'ok', correct: ansres.rows[0].correct_option})
  } catch(e) {
    res.status(500).send('Something went wong bub. Failed to add answer')
  }
})

app.get('/app.js', (req,res) => {
  res.sendFile(path.join(__dirname + '/app.js'));
})

console.log(`PLANNING TO USE PORT: ${port}`)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port: ${port}`))