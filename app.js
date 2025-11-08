import express from 'express'
import connection from './connection.js'
import Router from './router.js'
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config()
const app = express()
const portv = process.env.port

app.use(express.json())
app.use(cors('*'))
app.use('/api',Router)
app.use(express.json({limit:'50mb'}));

connection().then(()=>{
    app.listen(portv,()=>{
        console.log(`server created at http://localhost:${portv}` );
    })
}).catch((er)=>{
    console.log(er);
    
})