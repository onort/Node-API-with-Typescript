import { Request as req, Response as res, Router} from 'express'
import * as fs from 'fs'
import * as shortid from 'shortid'
import * as db from '../services/movieService'

let router: Router = Router()

let dataBase = fs.readFileSync(__dirname + '/../../database.json').toString('utf-8')
let data: Array<any> = JSON.parse(dataBase)

router.get('/', (req, res) => res.status(301).redirect('/api/movies/all'))

router.get('/all', (req, res) => {
  res.json({ movies: db.getAll() })
})

router.get('/:id', (req, res) => {
  let movieData = db.getById(req.params.id)
  if (movieData) res.json({ data: movieData })
  else res.status(404).json({ message: `No movie with the id of ${req.params.id} can be found`})
})

router.post('/add', (req, res) => {
  let movieToAdd = req.body  
  let { name, genre, release_date, language, length, box_office } = movieToAdd
  // TODO: Validate movie data
  movieToAdd._id = shortid.generate()
  if (name && release_date && box_office) { 
    db.add(movieToAdd)
    res.status(201).json({ message: `Movie "${name}" successfully added to our database with an id of ${movieToAdd._id}`})
  } else {
    res.status(404).json({ status: 'error', message: 'Movie you want to add should have a name, genre, release_date, language, length and box office data'})
  }
})

router.delete('/delete/:id', (req, res) =>{
  db.remove(req.params.id)
  res.status(201).json({ status: 'success', message: `Movie deleted` })
})

router.put('/update/:id', (req, res) => {
  //TODO: Validation
  let updatedMovie = req.body
  let { name, genre, release_date, language, length, box_office } = updatedMovie
  updatedMovie._id = req.params.id
  if (name && release_date && box_office) { //replace
    db.update(req.params.id, updatedMovie)
    res.status(201).json({ status: 'success', message: 'Movie data updated'})
  } else {
    res.status(404).json({ status: 'error', message: 'Name, genre, release_date, language, length and box office fields should be populated'})
  }
})

export default router