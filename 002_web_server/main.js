const express=require('express');
const app=express()

app.use('/scripts',express.static(__dirname+'/scripts'));
//pages 경로로 들어오는 요처엥 대해서
//main.js가 있는 위치로 가라(pages)

app.listen(3000,()=>{
    console.log('someone call at port 3000');
})
//서버 생성
//포트 번호 3000

//chrome 에서 {localhost:3000}으로 접속하면 {Cannot Get}볼수있음

//처리하는 루틴을 추가
app.get('/',(req,res)=>{
    console.log('require about root')
    //res.send('root에 대한 require')
    res.sendFile(__dirname+'/pages/index.html')
});

app.get('/about',(req,res)=>{
    console.log('request about {about}')
    //res.send('about에 대한 require')
    res.sendFile(__dirname+'/pages/about.html')
});

//app.post();

//terminal 종료는 ctrl c

//npm install -g nodemon
//설치하면 코드 변경시 터미널에서 재시작 안해도 알아서 적용시켜줌

app.get('/working',(req,res)=>{
    console.log('request about {work}')
    //res.send('about에 대한 require')
    res.sendFile(__dirname+'/pages/working.html')
});