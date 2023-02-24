const express=require('express')
const mysql=require('mysql')
const path=require('path')
const static=require('serve-static')
const dbconfig=require('.config/dbconfig.json')

//database connection pool
const pool=mysql.createPool({
    connectionLimit:10,
    host:dbconfig.host,
    user:dbconfig,user,
    password:dbconfig.password,
    database:dbconfig.database,
    debug:false,
    timezone:'09:00'
})

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public',static(path.join(__dirname,'public')))

app.post('/chardatafromdb_elec',(req,res)=>{
    console.log('chartdatafromdb_elec 호출됨')

    console.log('bid is %s',bid);

    pool.getConnection((err,conn)=>{
        const resData={}
        resData.result='error'
        resData.temp=[];
        resData.reg_date=[];
        
        if(err){
            conn.release();
            console.log('Mysql getConnection error. aborted');
            res.json(resData);
            return;
        }

        //db에 data 요청
        const exec=conn.query('select `value`,`regdata` from `INU_smartCampus`.`BldngElec` where `building_name`=? and `regdate` >"2021-12-20 00:00:00" order by `regdata` asc;',
        [bid],
        (err,rows)=>{
            if(err){
                console.log('Mysql query error. aborted');
                res.json(resData);
                return;
            }

            if(rows[0]){
                resData.result='ok'
                rows.forEach((val)=>{
                    resData.temp.push(val.value)
                    resData.reg_data.push(val.regdata)
                })
            }
            else{
                //query는 성공, 근데 데이터가 없는 경우
                resData.result='none'
            }

            return res.json(resData);
        })
    })
})

//building id가 주어진 경우 처리
app.post('/chardatafromdbwithbid',(req,res)=>{
    console.log('chartdatafromdbwithbid 호출됨')

    console.log('bid is %s',bid);

    pool.getConnection((err,conn)=>{
        const resData={}
        resData.result='error'
        resData.temp=[];
        resData.reg_date=[];
        
        if(err){
            conn.release();
            console.log('Mysql getConnection error. aborted');
            res.json(resData);
            return;
        }

        //db에 data 요청
        const exec=conn.query('select `temperature`,`reg_data` from `Building_Temperature` where `building_id`=? order by `reg_data` asc;',
        [bid],
        (err,rows)=>{
            if(err){
                console.log('Mysql query error. aborted');
                res.json(resData);
                return;
            }

            if(rows[0]){
                resData.result='ok'
                rows.forEach((val)=>{
                    resData.temp.push(val.temperature)
                    resData.reg_data.push(val.reg_data)
                })
            }
            else{
                //query는 성공, 근데 데이터가 없는 경우
                resData.result='none'
            }

            return res.json(resData);
        })
    })
})

app.post('/chardatafromdb',(req,res)=>{
    console.log('chartdatafromdb 호출됨')

    pool.getConnection((err,conn)=>{
        const resData={}
        resData.result='error'
        resData.temp=[];
        resData.reg_date=[];
        
        if(err){
            conn.release();
            console.log('Mysql getConnection error. aborted');
            res.json(resData);
            return;
        }

        //db에 data 요청
        const exec=conn.query('select `temperature`,`reg_data` from `Building_Temperature` order by `reg_data` asc;',
        (err,rows)=>{
            if(err){
                console.log('Mysql query error. aborted');
                res.json(resData);
                return;
            }

            if(rows[0]){
                resData.result='ok'
                rows.forEach((val)=>{
                    resData.temp.push(val.temperature)
                    resData.reg_data.push(val.reg_data)
                })
            }
            else{
                //query는 성공, 근데 데이터가 없는 경우
                resData.result='none'
            }

            return res.json(resData);
        })
    })
})

applisten(3000,()=>{
    console.log('Server started at 3000')
})