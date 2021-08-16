"use strict"



const express = require ('express')


const server = express()

const port  = 7000 


server.listen(port,()=>{              /////// preaper server listen request//////
    console.log(' Iam listening ');  ///// show in terminal cuz its node server //// 


})


//localHost:7000/test  /// exactly like this and hit it in browser hit request 

server.get('/test',(req,res)=>{
        res.send(' its working ')
})


