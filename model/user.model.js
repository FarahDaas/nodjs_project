const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


let schemauser=mongoose.Schema({
    username:String,
    email:String,
    password:String

})


var url='mongodb://localhost:27017/biblo'
var User=mongoose.model('user',schemauser)

exports.register=(username,email,password)=>{
    return new Promise((resolve,reject)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
     return User.findOne({email:email})
    }).then((doc)=>{
        if(doc){
            mongoose.disconnect()
            reject('we have this user in our data base')

        }else{
          bcrypt.hash(password,10).then((hashedpassword)=>{
              let user=new User({
                  username:username,
                  email:email,
                  password:hashedpassword
              })
              user.save().then((user)=>{
                  mongoose.disconnect()
                  resolve(user)
              }).catch((err)=>{
                  mongoose.disconnect()
                  reject(err)
              })
          }).catch((err)=>{
              mongoose.disconnect()
              reject(err)
          })

        }
    })
    })
}
var privatekey="this is my secret key jhhlhmgdfjkv"
exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
     return User.findOne({email:email})
    }).then((user)=>{
        if(!user){
            mongoose.disconnect()
            reject('invalide email or password')

        }else{
          bcrypt.compare(password,user.password).then((same)=>{
             if(same){
            let token= jwt.sign({id:user._id,username:user.username},privatekey,{
                 expiresIn:'1h'  
             })
             mongoose.disconnect()
             resolve(token)


            }else{
                mongoose.disconnect() 
                reject('invalide email or password')
            }

             
          }).catch((err)=>{
              mongoose.disconnect()
              reject(err)
          })

        }
    })   
  })
}

exports.getallusers=()=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       return User.find()
        
    }).then((doc)=>{
        resolve(doc)
    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })
    })
    }