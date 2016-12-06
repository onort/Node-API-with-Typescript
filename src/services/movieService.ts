import * as fs from 'fs'
import * as shortid from 'shortid'

let dataBase = fs.readFileSync(__dirname + '/../../database.json').toString('utf-8')
let data: Array<any> = JSON.parse(dataBase)


export function getAll() {
    return data.map(movie => {
    return { name: movie.name, id: movie._id }
  })
}

export function getById(id) {
  return data.filter(movie => movie._id === id)[0]
}

export function add(movie) {
  data.push(movie)
  updateDB(data)  
}

export function remove(id) {
  let deleteIndex = data.findIndex(movie => movie._id === id)
  data.splice(deleteIndex, 1)
  updateDB(data)
}

export function update(id, updatedMovie) {
  let updateIndex = data.findIndex(movie => movie._id === id)
  data[updateIndex] = updatedMovie
  updateDB(data)
}


let updateDB = (db) => {
  let updatedDB = JSON.stringify(db, null, 2)
  fs.writeFileSync(__dirname + '/../../database.json', updatedDB)
}