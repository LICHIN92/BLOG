const mongoose=require('mongoose')
// creating schema
const userSchema=mongoose.Schema({
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
// creating model using mongoose.model(), model name is users
const users=mongoose.model('users',userSchema)

module.exports={users}