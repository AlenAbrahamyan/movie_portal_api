const client = require('../connection.js')

function addActors (req, res, actors, movie_id) {
    actors.map(actor=>{
        
            client.query(`Select * from actors where first_name='${actor.first_name}' AND last_name='${actor.last_name}'`, (err, result)=>{
                
                if(!err){
                    
                    if(result.rows.length == 0){

                        const insertQuery = `insert into actors(id, first_name, last_name, movies) 
                        values(${actor.id}, '${actor.first_name}', '${actor.last_name}', '{${movie_id}}')`
                        console.log(insertQuery)
                        client.query(insertQuery, (err, result)=>{
                            if(!err){
                                console.log('Insertion was successful')
                            }
                            else{ console.log("ero-2_"+err.message) }
                        })
                    }else{

                        let updateQuery = `update actors
                       set movies = '{${[result.rows[0].movies, movie_id]}}'
                       where first_name='${actor.first_name}' AND last_name='${actor.last_name}'`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            console.log('Update was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
                    }
                }else{
                    console.log("error-1_"+err)
                }
            });
            
            client.end;
        
    })

}

module.exports = addActors;