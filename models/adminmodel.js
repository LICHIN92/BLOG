const mongoose=require('mongoose')
const adminSchema=mongoose.Schema({
                    name:{type:"string",
                        require:true 
                        },
                    email:{type:"string",
                        require:true
                    },
                    password:{type:"string",
                        require:"true"
                        }         
                    })
const admins=mongoose.model('admin',adminSchema)
module.exports={admins}
