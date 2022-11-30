const express=require('express')
const bookroute=require('./router/book.route')
const userRoute=require('./router/user.route')
const adminRoute=require('./router/admin.route')
const app=express()



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Request-Method',"*")
    res.setHeader('Access-control-Allow-headers',"authorization")
    next()
})
var cors = require('cors')

app.use(cors()) 
app.use('/',bookroute)
app.use('/',userRoute)
app.use('/admin',adminRoute)



app.listen(3001,()=>console.log('server run in port 3001'))