import { Request as req, Response as res, Router} from 'express'
import * as fs from 'fs'
import * as shortid from 'shortid'

let router: Router = Router()

let dataBase = fs.readFileSync(__dirname + '/../../database.json').toString('utf-8')
let data: Array<any> = JSON.parse(dataBase)

router.get('/', (req, res) => res.status(301).redirect('/api/movies/all'))

router.get('/all', (req, res) => {
  let allMovies = data.map(movie => {
    return { name: movie.name, id: movie._id }
  })
  res.json({ movies: allMovies })
})

router.get('/:id', (req, res) => {
  let idToFind = req.params.id
  let movieData = data.filter(movie => movie._id === idToFind)[0]
  if (movieData) res.json({ data: movieData })
  else res.status(404).json({ message: `No movie with the id of ${idToFind} can be found`})
})

router.post('/add', (req, res) => {
  // Add id to movie
  // Validate movie data
  let movieToAdd = req.body
  let { name, genre, release_date, language, length, box_office } = movieToAdd
  movieToAdd._id = shortid.generate()
  if (name && release_date) {
    data.push(movieToAdd)
    updateDB(data)
    res.status(201).json({ status: 'success', message: `Movie "${name}" successfully added to our database`})
  } else {
    res.json({ message: 'Movie you want to add should have a name, genre, release_date, language, length and box office data'})
  }
})

router.delete('/delete/:id', (req, res) =>{
  let movieIdToDelete = req.params.id
  let movieToDelete = data.findIndex(movie => movie._id === movieIdToDelete)
  let deletedMovieName = data[movieToDelete].name
  data.splice(movieToDelete, 1)
  updateDB(data)
  res.status(201).json({ status: 'success', message: `"${deletedMovieName}" has been successfuly deleted from our movie database` })
})

// class db
//  getAll = (db)
//  getById = (db, index)
//  add = (db, movie)
//  remove = (db, index)
//  update = (db, index, item)
let updateDB = (db) => {
  let updatedDB = JSON.stringify(db, null, 2)
  fs.writeFileSync(__dirname + '/../../database.json', updatedDB)
}


// router.put

export default router