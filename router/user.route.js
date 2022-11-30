const route=require('express').Router()
const usermodel=require('../model/user.model')




route.post('/register',(req,res,next)=>{
    usermodel.register(req.body.username,req.body.email,req.body.password)
    .then((user)=>res.status(200).json({user:user,msg:"added !"}))
    .catch((err)=>res.status(400).json({error:err,msg:"try with other email"}))
})


route.post('/login',(req,res,next)=>{
    usermodel.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({error:err}))
})
route.get('/users',(req,res,next)=>{
    usermodel.getallusers()
    .then((doc)=>res.send(doc))
    .catch((err)=>res.send(err)) 

})


module.exports=route