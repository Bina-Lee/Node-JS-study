console.log('hello');
//ctrl + back tic -> 터미널 오픈

function sayHello(name){
    console.log('hello'+name);
}
sayHello('john');

/*
setTimeout(()=>{
    console.log('한번만');
},3000);

setInterval(()=>{
    console.log('반복실행...');
},1000);
*/


// terminal에서 {node {file name}.js}로 실행


//module이라는 환경 설명
//함수들의 집합, 라이브러리

const a=require('./logger.js');
//로그 파일을 불러옴
a.special_showLogMessage('testing logger');