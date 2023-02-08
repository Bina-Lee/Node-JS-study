const express=require('express');
const app=express()

app.listen(3000,()=>{
    console.log('someone call at port 3000');
})
//서버 생성
//포트 번호 3000

//chrome 에서 {localhost:3000}으로 접속하면 {Cannot Get}볼수있음

app.get('/',(req,res)=>{
    console.log('require about root')
});

app.get('/about',(req,res)=>{
    console.log('request about {about}')
});

app.post();