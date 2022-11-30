const { JsonWebTokenError } = require('jsonwebtoken')
const bookmodel=require('../model/book.model')
const route=require('express').Router()
const jwt=require('jsonwebtoken')
const { append } = require('express/lib/response')


route.get('/',(req,res,next)=>{
res.send('welcome')
})



var privatekey="this is my secret key jhhlhmgdfjkv"


//verify token for user 

verifyToken=(req,res,next)=>{
   let token=req.headers.authorization
   
if(!token ){
    res.status(400).json({msg:"access rejected !"})
}

try{
    jwt.verify(token,privatekey)
    next()
}catch(e){
    res.status(400).json({msg:e})

  }
 

}

//verify token for admin


verifyTokenAdmin=(req,res,next)=>{

    let token=req.headers.authorization
    let role=req.headers.role
 if(!token || role!='admin'){
     res.status(400).json({msg:"access rejected !"})
 }
 
 try{
     jwt.verify(token,privatekey)
     next()
 }catch(e){
     res.status(400).json({msg:e})
 
   }
  
 
 }
 var secretkey='788999999855525252n'
 var clientkey=123456789

 verifysecretclient=(req,res,next)=>{
     let sk=req.params.secret
     let ck=req.params.client
     if(sk==secretkey && ck==clientkey){
         next()
     }else{
         res.status(400).json({error:"you can't access to this route because you don't sent me secret key and client key"})
     }
 }


route.post('/addbook',(req,res,next)=>{
   bookmodel.postnewbook(req.body.title,req.body.discription,req.body.author,req.body.price,req.body.image)
   .then((doc)=>res.status(200).json(doc))
   .catch((err)=>res.status(400).json({error:err})) 
})

route.get('/books',(req,res,next)=>{
    bookmodel.getallbook()
    .then((doc)=>res.send(doc))
    .catch((err)=>res.send(err)) 

})

route.get('/book/:id',(req,res,next)=>{
    bookmodel.getonebook(req.params.id)
    .then((doc)=>res.send(doc))
    .catch((err)=>res.send(err)) 

})

route.delete('/book/:id',(req,res,next)=>{
    bookmodel.deletebook(req.params.id)
    .then((doc)=>res.send(doc))
    .catch((err)=>res.send(err)) 

})
route.patch('/book/:id',(req,res,next)=>{
    bookmodel.updatebook(req.params.id,req.params.title,req.params.discription,req.params.author,req.params.price,req.params.image)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err)) 

})

module.exports=route