"use strict"



const express = require ('express')  ////  as import library 
const cors = require('cors')         ////


require('dotenv').config();


const server = express()

const port  = 7000 

const  wheatherData = require ('./Data.json')


server.listen(port,()=>{              /////// preaper server listen request//////
    console.log(' Iam listening ');  ///// show in terminal cuz its node server //// 


})


//localHost:7000/test  /// exactly like this and hit it in browser hit request 

server.get('/test',(req,res)=>{
        res.send(' its working ')
})


class weather{
    constructor(item){
        this.date=item.valid_date;
        this.description = item.weather.description; //// in jason  
    }
}




//localHost:7000/wheather?cityName=Amman  


server.get('/wheather',(req,res) =>{
            let searchQury = req.query.cityName /// to make request diynamk ... to acces after ? 

        let cityData = wheatherData.find( city =>{
            if ( city.city_name === searchQury ) { /////// 
               
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








