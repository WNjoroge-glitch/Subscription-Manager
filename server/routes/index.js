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








const authorization = (req,res,next)=>{
  const token = req.cookies.jwt
  if(!token){
    return res.sendStatus(403)
  } 
  try{
    const data = jwt.verify(token,'jwtsecret')
    req.userId = data.id
    
    return next()
  } catch{
    return res.sendStatus(403)
  }

}

/* GET home page. */
router.get('/home',function(req, res, next) {
  const token = req.cookies['jwt']

  const claims = jwt.verify(token,'jwtsecret')
  if(!claims){
    res.sendStatus(401)
  }
  res.send('aunthenticated')
})
//   try {
//     const cookie = req.cookies('jwt')
//   const claims = verify(cookie,'jwtsecret')
//   if(!claims){
//     return res.status(401).send('unauthenticated')
//   }
//   res.send(claims.id)
  
//   } catch (error) {
//     return res.status(401).send('unautheticated')
//   }
  
// });

router.post('/create', function(req,res){
  const billed = req.body.billed
  const amount = req.body.amount
 const reminder = req.body.reminder
  const channel = req.body.channel
  

  const sqlQuery = 'INSERT INTO subscription_info(SubscriptionName,BilledOn,Amount,reminder) VALUES(?,?,?,?);'
  db.query(sqlQuery,[channel,billed,amount,reminder],(err,result) => {
    if(err){
      console.log(err)
    } else {
      res.send("values inserted")
    }
})
})


router.get('/list',authorization,(req,res) =>{
  

  
  db.query('SELECT * FROM subscription_info WHERE user_id = ?',req.userId, (err,result) =>{
    
    if(err){
      console.log(err)
    }
    if(result.length> 0){
      console.log(`id:${req.userId}`)
      res.send(result)
     
    } else {
    
      console.log(`id:${req.userId}`)
      
    }
    
  })
})


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
  const name = req.body.names
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  if(password !== confirmPassword){
    res.status(400).send("passwords dont match")
  } else {
    bcrypt.hash(password,10,(err,hash)=>{
      db.query('INSERT INTO users (name,email,pw) VALUES(?,?,?)',[name,email,hash],(error,results)=>{
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

// router.get('/signin',(req,res)=>{
//   if(req.session.userEmail){
//     res.send({loggedIn:true,user:req.session.userEmail})
//   } else{
//     res.send({loggedIn:false})
//   }
// })


router.post('/signin',(req,res)=>{
  const email = req.body.email
  const password = req.body.password 

  db.query(`SELECT * FROM users WHERE email = ?`,email,(error,result)=>{
    
    if(error){
      res.send({error:error})
    } else {
     
      if(result.length > 0){
        bcrypt.compare(password,result[0].pw,(error,isTrue)=>{
            if(error){
              console.log(error)
            }
          
            if(isTrue){
              // req.session.userEmail = result[0].email
           
              

              // const id = result[0].id
              const token = jwt.sign({id:result[0].id},'jwtsecret')
              res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:24*60*60*1000
              })
              res.send(result[0])
            
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
router.post('/logout',authorization,(req,res)=>{
  res.clearCookie('jwt')
  // res.cookie('jwt','',{
  //   maxAge:0,
    
  // })
 
  res.send({message:'logout succeeded'})
})
module.exports = router;


