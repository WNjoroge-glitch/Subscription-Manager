const express = require('express')
const router = express.Router()
const app=express()
const cors = require("cors")

const mysql = require('mysql')

// const connection= mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     port:'3306',
//     password:'sqlpassword1#',
//     database:'subscription_info'
// })
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// connection.connect()

app.get('/', (req,res) =>{
    res.send("hellow orld")
    // const sqlInsert =
    //  'INSERT INTO subscription_table (Billed_On,Amount_Charged,Currency,Reminder) VALUES("2","2008-01-01 00:00:01","500","USD","2008-02-01 00:00:01");'
    // connection.query(sqlInsert,(error,results) =>{
    //     res.send("hello maryd")

    // })
    
})
// app.post('/api/insert' ,(req,res) =>{
//     console.log("route reached")
//     const billed_On = req.body.billed_On
//     const amount_Charged = req.body.amount_Charged
//     const currency = req.body.currency
//     const reminder = req.body.reminder
//     console.log(Billed_On)

//     const sqlInsert = 'INSERT INTO subscription_table (id,Billed_On,Amount_Charged,Currency,Reminder) VALUES("?","?","?","?","?");'
//     connection.query(sqlInsert,[Billed_On,Amount_Charged,Currency,Reminder],(err,results) =>{
//         console.log(err)

//     })
//     console.log("route reached")
// })


app.listen(3001,()=>{
    console.log("server started here")
})