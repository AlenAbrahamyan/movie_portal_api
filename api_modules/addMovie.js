const client = require('../connection.js')
const addActors = require('./addActors.js')

function addMovie (req, res, movie) {


    const id=Math.floor(Math.random()*10000000000)
    let arr = []
    for(let i=0; i<movie.actors.length; i++){
        movie.actors[i].id = Math.floor(Math.random()*10000000000)
        arr.push(movie.actors[i].id)
    }
    console.log(id, movie.title, movie.poster_url, movie.rating, movie.year, movie.actors)
    addActors(req, res, movie.actors, id)
  
    const insertQuery = `insert into data_movie(id, title, poster_url, rating, year, actors) 
                       values(${id}, '${movie.title}', '${movie.poster_url}', ${movie.rating}, ${movie.year}, '{${arr}}' )`
                       console.log(insertQuery)
    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
}

module.exports = addMovie;