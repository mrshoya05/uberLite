const mongoose = require('mongoose');

function connectToDatabase(){
    mongoose.connect(
        process.env.MONGO_URI
    ).then(
        ()=>{
            console.log("successfully connected to database !");
            
        }
    ).catch(
        (err)=>{
         console.log("unable toct with database", err);
         
        }
    )
    
}

module.exports  = connectToDatabase;