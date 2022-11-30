const mongoose =require('mongoose')
const { stringify } = require('nodemon/lib/utils')

const Joi = require('joi')

const schemaValidation=Joi.object({
    title:Joi.string().min(2).max(50).required(),
    discription:Joi.string().min(2).required(),
    author:Joi.string().min(2).max(50).required(),
    price:Joi.number().required(),
    image:Joi.string()
})

let schemaBook=mongoose.Schema({
    
    title:String,
    discription:String,
    author:String,
    price:Number,
    image:String
    
})

var Book=mongoose.model('book',schemaBook)

var url='mongodb://localhost:27017/biblo'

exports.testConnect=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            mongoose.disconnect()
            resolve('connected')
        }).catch((err)=>reject(err))
       
    })
}

exports.postnewbook=(title,discription,author,price,image)=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            
         let validation =  schemaValidation.validate({title:title,discription:discription,author:author,price:price,image:image})
            if(validation.error){
                mongoose.disconnect
                reject(validation.error.details[0].message)

            }
         let book=new Book({
                title:title,
                discription:discription,
                author:author,
                price:price,
                image:image
            })
            book.save().then((doc)=> {
                mongoose.disconnect
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect
                reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getallbook=()=>{
    return new Promise((resolve,reject)=>{

        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
       return Book.find()
        
    }).then((doc)=>{
        resolve(doc)
    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })
    })
    }
    exports.getonebook=(id)=>{
        return new Promise((resolve,reject)=>{
    
            mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Book.findById(id)
            
        }).then((doc)=>{
            resolve(doc)
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
        })
        }
        exports.deletebook=(id)=>{
            return new Promise((resolve,reject)=>{
        
                mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
               return Book.deleteOne({_id:id})
                
            }).then((doc)=>{
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
            })
            }
            
        exports.updatebook=(id,title,discription,author,price,image)=>{
            return new Promise((resolve,reject)=>{
        
                mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
               return Book.updateOne({_id:id},{title:title,discription:discription,author:author,price:price,image:image})
                
            }).then((doc)=>{
                resolve(doc)
            }).catch((err)=>{
                mongoose.disconnect()
                reject(err)
            })
            })
            }