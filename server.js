"use strict"



const express = require ('express')  ////  as imPORT library 
const cors = require('cors')         ////
require('dotenv').config();



const  wheatherData = require ('./Data.json')


const server = express()

const PORT = process.env.PORT



server.listen(PORT,()=>{              /////// preaper server listen request//////
    console.log(' Iam listening ');  ///// show in terminal cuz its node server //// 


})


//localHost:7000/test  /// exactly like this and hit it in browser hit request 

server.get('/test',(req,res)=>{
        res.send(' its working ')
})


class weather{
    constructor(item){
        this.date=item.valid_date;                    ///
        this.description = item.weather.description; //// in jason  
    }
}




//localHost:7000/wheather?cityName=Amman   ///city Name its a quary and any thing after ? 

server.get('/wheather',(req,res) =>{
            let searchQuery = req.query.cityName /// to make request diynamk ... to acces after ? 

        let cityData = wheatherData.find( city =>{
            if ( city.city_name === searchQuery ) { ///////searchQuery
               
                return city;
            }
        })

        console.log(cityData);


        let weatherArr=cityData.data.map((item)=>{
            console.log(item)
        
            return new weather(item);
        })

        
   res.send(weatherArr)
})


///localhost:7000/hhhhhhh OrAny mistake 
server.get('*',(req,res)=>{
    res.status(404).send('Eroor page Not found ')
})





