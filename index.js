require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes=>{
    res.json(notes)
  })
})

app.get('/api/notes/:id', (req, res) => {
  Note.findById(req.params.id).then(note => {
    res.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  response.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
