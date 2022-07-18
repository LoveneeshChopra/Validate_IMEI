// ./src/index.js
// console.log("Hello World!");
// importing the dependencies

const express=require('express');
var imei=require('node-imei');
const cors=require('cors');

//defining express app
var app=express();
//enabling CORS for all requests
app.use(cors());
// defining an endpoint to return all ads
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
const IMEI=new imei();
app.get("/api/imei/:nums",function(req,res){
    const isValid=(num)=>{
        if(IMEI.isValid(num)==true){
            const ans="Valid IMEI Number";
            return ans;
        }
        else if(IMEI.isValid(num)==false){
            const nans="Invalid IMEI Number";
            return nans;
        }
    }
    const imei=req.params.nums;
    try{
        const ans=isValid(imei);
        return res.json(ans);
    }
    catch(e){
        return res.status(500);
    }
});
// starting the server
app.listen(3004,()=>{
    console.log('listening on the port 3004');
});
