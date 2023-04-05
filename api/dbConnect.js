const mongooes = require('mongoose');
TODO://use dotEnv 

async function startConnection(){
    try{
        const connection = await mongooes.connect('useYourConnectionString')
    }catch(e){
        console.log(e);
    }
}

module.exports = startConnection;