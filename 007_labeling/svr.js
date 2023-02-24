const express=require('express')
const mysql=require('mysql')
const path=require('path')
const static=require('serve-static')
const dbconfig=require('./config/dbconfig.json')

const pool=mysql.createPool({
    connectionLimit:10,
    host:dbconfig.host,
    user:dbconfig.user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false
})

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public',static(path.join(__dirname, 'public')))

//test3의 이미지 가져오기 버튼을 누르면 답변하는 부분
//이미지를 보내줌
app.post('/getimg fromdbbyname',(req,res)=>{
    console.log('getimgfromdbbyname 호출됨')
    const imgname=req.body.imgname
    console.log(`imgname : ${imgname}`)

    const reply={
        'status':'nok'
    }
    pool.getConnection((err,conn)=>{
        if(err){
            console.log('pool.getConnection 에러발생')
            console.dir(err)
            reply['status']='nok db pool error'
            res.json(reply)
            return;
        }

        const query_str='select `img` from Animals where `name`=?'

        conn.query(query_str, [imgname],(error,rows,fields)=>{
            if(error){
                conn.release()
                console.dir(error)
                reply['status']='nok query error'
                res.json(reply)
                return;
            }

            conn.release()

            if(rows.length>0){
                reply['status']='ok'
                reply['rows']=rows
                console.log('이미지 전달 성공')

            }
            else{
                reply['status']='nok,no result'
                console.log('사진 이름과 매칭되는 사진 없음')
            }
            
            res.json(reply)
        })
    })
})

app.post('/saveBbox',(req,res)=>{
    console.log('saveBbox 호출됨')
    const imgname=req.body.imgname
    const coordstxt=req.body.coordstxt
    
    console.log(`imgname is ${imgname}`)
    console.log(`coords is${coordstxt}`)

    const reply={
        'status':'nok'
    }

    pool/getConnection((err,conn)=>{


        if(err){
            console.log('pool.getConnection 에러발생')
            console.dir(err)
            reply['status']='nok db pool error'
            res.json(reply)
            return;
        }

        const query_str='updata Animals set `coords`=?where `name  `=?'

        conn.query(query_str,[coordstxt,imgname],(error,rows,fields)=>{
            if(err){
                console.log('pool.getConnection 에러발생')
                console.dir(err)
                reply['status']='nok db pool error'
                res.json(reply)
                return;
            }

            conn.release()
            reply['status']='ok'
            res.json(reply)
            console.log(`Coords 저장 성공. 대상 이미지 ${imgname}`)
        })

    })
})

app.listen(3000,()=>{
    console.log('Server started at 3000')
})