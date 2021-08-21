"use strict"




const express = require ('express')  ////  as imPORT library 

let handelWheather  =require('./models/liveWheater')  



const cors = require('cors')         ////

require('dotenv').config();

const axios = require('axios') ////// use axios cuz send req to live Api server like what doing in  front End 
 


const  wheatherData = require ('./Data.json') 


const server = express()

const PORT = process.env.PORT

server.use(cors()); 



server.listen(PORT,()=>{              /////// preaper server listen request//////
    console.log(' Iam listening ');  ///// showing  in terminal cuz its node server //// 


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




//localHost:3001/wheather?cityName=Amman   ///city Name its a quary and any thing after ? 

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


/


///_________________________________________________________ wheater live ___________________________________________________________///



// localhost:3001/daily?city=Amman
server.get('/daily',handelWheather)

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=7d346a3ced3b4f4d885b3ec39a91dc0b	
  





// console.log(wheatherData); 


 



//localhost:3001/hhhhhhh OrAny mistake 
server.get('*',(req,res)=>{
    res.status(404).send('Eroor page Not found ')
})
