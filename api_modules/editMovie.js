const client = require('../connection.js')
const addActors = require('./addActors.js')

function editMovie (req, res, movie, id) {
    let arr = []
    for(let i=0; i<movie.actors.length; i++){
        movie.actors[i].id = Math.floor(Math.random()*10000000000)
        arr.push(movie.actors[i].id)
    }
    
    addActors(req, res, movie.actors, id)

    let updateQuery = `update data_movie
    set title = '${movie.title}',
    poster_url = '${movie.poster_url}',
    rating = '${movie.rating}',
    year = '${movie.year}', 
    actors = '{${arr}}'  
    where id = ${id}`

    client.query(updateQuery, (err, result)=>{
    if(!err){
        console.log('Update was successful')
    }
    else{ console.log(err.message) }
    })

    client.end;
}

module.exports = editMovie;