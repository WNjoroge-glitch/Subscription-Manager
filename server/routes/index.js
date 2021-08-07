var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var bcrypt = require('bcrypt');
var session = require('express-session');
const jwt = require('jsonwebtoken')


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sql1pass',
    database:'subscriptions'

})


router.use(session({
    key:"userId",
    secret:'subscribe',
    resave:false,
    saveUninitialized:false,
    cookie:{
      expires:60*60*24,
    },
    
}))

// const verifyJWT = (req,res,next) =>{
//   const token = req.headers('x-access-token')

//   if(!token){
//     res.send('tokens needed')
//   } else {
//     jwt.verify(token,'jwtsecret',(err,decode)=>{
//       if(err){
//         res.json({auth:false,message:'failed to aunthenticate'})
//       } else {
//         req.userId = decode.id
//         next()
//       }
//     })
//   }
// }


/* GET home page. */
router.get('/', function(req, res, next) {
  // try {
  //   const cookie = req.cookies('jwt')
  // const claims = verify(cookie,'jwtsecret')
  // if(!claims){
  //   return res.status(401).send('unauthenticated')
  // }
  // res.send(claims.id)
  
  // } catch (error) {
  //   return res.status(401).send('unautheticated')
  // }
  res.send('hello world')
  
  
 
  
});

// router.post('/create', function(req,res){
//   const billed = req.body.billed
//   const amount = req.body.amount
//   const currency = req.body.currency
//   const reminder = req.body.reminder
//   const channel = req.body.channel
//   console.log(`channel:${channel}`)

//   const sqlQuery = 'INSERT INTO subscription_table(Billed_On,Amount_Charged,Currency,Reminder,name,user_id) VALUES(?,?,?,?,?,?);'
//   db.query(sqlQuery,[billed,amount,currency,reminder,channel,req.session.userId],(err,result) => {
//     if(err){
//       console.log(err)
//     } else {
//       res.send("values inserted")
//     }
// })
// })


// router.get('/list',verifyJWT, (req,res) =>{
  
//   db.query('SELECT * FROM subscription_table WHERE user_id = ?',req.session.userId, (err,result) =>{
//     if(err){
//       console.log(err)
//     }
//     if(result.length> 0){
//       console.log(result)
//       res.send(result)
//     } else {
//       console.log('no result')
//       res.send({message:"no data yet"})
//     }
    
//   })
// })


// router.post('/pref',(req,res)=>{
//   const notify_when = req.body.notifyWhen 
//   const notify_via = req.body.notifyVia 
//   const currency = req.body.currency
//   const reminder = req.body.pickDate

//   console.log(notify_when,reminder)
  
//   const sqlQuery = 'INSERT INTO preferences (notify_when,notify_via,currency,Reminder) VALUES (?,?,?,?);'

//   db.query(sqlQuery,[notify_when,notify_via,currency,reminder],(error,results)=>{
//     if (error){
//       console.log(error)
//     } else {
//       console.log("values inserted successfully")
//     }
//   })
// })

router.post('/signup',(req,res)=>{
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  if(password !== confirmPassword){
    res.status(400).send("passwords dont match")
  } else {
    bcrypt.hash(password,10,(err,hash)=>{
      db.query('INSERT INTO users (email,pw) VALUES(?,?)',[email,hash],(error,results)=>{
        if(error){
          console.log(error)
        } else {
          console.log("successful input into db")
          res.send('hello world')
        }
      })

    })
    
  }
 
  
})

router.get('/signin',(req,res)=>{
  if(req.session.userEmail){
    res.send({loggedIn:true,user:req.session.userEmail})
  } else{
    res.send({loggedIn:false})
  }
})



router.post('/signin',(req,res)=>{
  const email = req.body.email
  const password = req.body.password 

  db.query('SELECT * FROM users WHERE email = ?', email,(error,result)=>{
    
    if(error){
      res.send({error:error})
    } else {
     
      if(result.length > 0){
        bcrypt.compare(password,result[0].pw,(error,isTrue)=>{
            if(error){
              console.log(error)
            }
          
            if(isTrue){
              req.session.userEmail = result[0].email
              req.session.userId = result[0].id
              

              const id = result[0].id
              const token = jwt.sign({id},'jwtsecret')
              res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:24*60*60*1000
              })
              res.send({message:'successful'})
              // res.json({auth:true,token:token,result:result})
              
              
            } else {
              res.send({message:'wrong password combination'})
              console.log('no results')
            }
          })
           
          } else{
            res.send({message:"user doesn't exist"})
          }

    }

    
  })
})

// router.get('/account',(req,res)=>{
//   if(res.locals.isLoggedIn){
//     res.send(req.session.userEmail)
//   } else {
//     res.status(400).send('not logged in')
//   }

// })
// router.get('/options', (req,res) => {
//   db.query('SELECT * FROM subscriptions_list',(err,result)=>{
//     if(err){
//       console.log(err)
//     }
//     res.send(result)
//   })
// })

// router.delete('/list/delete/:id',(req,res) => {
//   //const id = Number(req.params.id)
//   console.log(`this is the req ${req}`)
//   // db.query('DELETE FROM subscription_table WHERE id = ?',id,(err,result) =>{
//   //   if(err){console.log(err)}
//   // })
// })


//logout
router.post('/logout',(req,res)=>{
  res.cookie('jwt','',{
    maxAge:0,
    
  })
})
module.exports = router;
