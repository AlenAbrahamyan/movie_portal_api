const express = require('express');
const client = require('./connection.js')
const app = express();

const bodyParser = require("body-parser");
const addMovie = require("./api_modules/addMovie");
const editMovie = require("./api_modules/editMovie");
app.use(bodyParser.json());


client.connect();

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

//get all movies
app.get('/', (req, res)=>{
    client.query(`Select * from data_movie`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
    
})

//add movie
app.post('/add_movie', (req, res)=> {
    addMovie(req, res, req.body)
})

//update movie data
app.put('/edit_movie/:id', (req, res)=> {
    editMovie(req, res, req.body, req.params.id)
})

//delete movie
app.delete('/delete_movie/:id', (req, res)=> {
    let insertQuery = `delete from data_movie where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})

//serch film with title
app.get('/search/:title', (req, res)=>{
    console.log(req.params.title)
    client.query(`Select * from data_movie where title='${req.params.title}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//filter by rating
app.get('/filter_by_rating/:rating', (req, res)=>{
    client.query(`Select * from data_movie where rating>${req.params.rating}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//filter by year
app.get('/filter_by_year/:year', (req, res)=>{
    client.query(`Select * from data_movie where year>${req.params.year}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


//get actors movies
app.get('/filter_by_actor/:actor_id', (req, res)=>{
    client.query(`Select * from actors where id=${req.params.actor_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows)      
        }
    });
    
})

 
//paginate movie
app.put('/paginate_movie/:movie_id', (req, res)=> {
    const insertQuery = `update data_movie
    set paginate = true
    where id = ${req.params.movie_id}`
   
    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log('movie is paginated')
        }
        else{ console.log(err.message)}
    })

    client.end;
})
