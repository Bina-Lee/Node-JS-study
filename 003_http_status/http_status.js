// HTTP response status code
// webserver가 client에게 주는 코드

const express = require('express');
const app=express();

app.get('/',(req,res)=>{
    res.sendStatus(200); //status code
            //OK
    // 400 : bad request
    //403 : forbidden 비공개자료
    //404 : not fount
    //500 : internal server error
    //503 : service unavailable
})

//postman
