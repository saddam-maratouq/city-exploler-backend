"use strict"



require('dotenv').config();

const express = require ('express')  ////  as imPORT library 

const cors = require('cors')         ////

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


//////////////////////////////////////////////////////////////////////////



//localhost:7000/forecastLive/daily?searchQuery=Amman
server.get('/forecastLive',handelWheather)

// https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=7d346a3ced3b4f4d885b3ec39a91dc0b	
  async function handelWheather(req,res) {
    
    let searchLiveWheater = req.query.searchQuery 
    

    try{
        wheaterLiveUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchLiveWheater}&key=${process.env.WHEATHER_KEY}`	

        let wheaterLiveResult = await axios.get(wheaterLiveUrl) 
        console.log('kkkkkk',wheaterLiveResult.data);
        res.send(wheaterLiveResult.data) 
    }

catch(error) {
    console.log('eeeeee',error);
    res.send('eroor from axios')
}
}

// class WheatherInfo {
//     constructor (item)
//     this
// }


