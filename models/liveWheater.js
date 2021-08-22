let axios=require('axios');
module.exports=handelWheather;

let inMemory={};


async function handelWheather(req,res) {
    
    let searchLiveWheater = req.query.city
   
    let wheaterLiveUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WHEATHER_KEY_live}&city=${searchLiveWheater}`;
    
    if(inMemory[searchLiveWheater] != undefined){
        console.log(' cache hit , data in cache memory');
        res.send(inMemory[searchLiveWheater]);

    }

         else{

        try{
    
   
            let newArrr=[];
        
            let wheatherDat= await axios.get(wheaterLiveUrl);
              
            let weatherArr=wheatherDat.data.data
                for(let i=0;i<5;i++){
                let newOb=new forecastWheater(weatherArr[i]);
                
                newArrr.push(newOb);
                }

                inMemory[searchLiveWheater]=newArrr;
                console.log('cache miss');
                res.send(newArrr);
                }
           
            catch (error) {
                        res.send(error)
            }

    }
    
 
    
}

  




class forecastWheater {
    constructor (item){
    this.description=   item.weather.description
     this.lowTemp =       item.low_temp
    this.maxTemp =      item.max_temp;
    this.date =         item.datetime;
}
}

