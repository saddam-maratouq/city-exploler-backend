let axios=require('axios');
module.exports=handelWheather;




async function handelWheather(req,res) {
    
    let searchLiveWheater = req.query.city
    

    try{
            let  wheaterLiveUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.WHEATHER_KEY}&city=${searchLiveWheater}&days=5`	

               let wheaterLiveResult = await axios.get(wheaterLiveUrl) 
       
        console.log('kkkkkk',wheaterLiveUrl);
       
        // res.send(wheaterLiveResult.data)  

        let wheatherData = wheaterLiveResult.data.data.map(info=>{

            return new forecastWheater(info)
        })

              res.send(wheatherData);

    }


catch (error) {
    console.log('eeeeee',error);
    // res.send('eroor from axios') 
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

