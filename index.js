const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())


let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body
  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing',
    })
  }

  const ids = notes.map((note) => note.id)
  const maxIds = Math.max(...ids)

  const newNote = {
    id: maxIds + 1,
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString(),
  }

  notes = notes.concat(newNote)

  res.status(201).json(newNote)
})

const PORT = process.env.PORT || 3001 // Usando PORT de entorno si está definido
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
