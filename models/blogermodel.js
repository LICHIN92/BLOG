const mongoose=require('mongoose')
const blogschema=mongoose.Schema({
                    title:{type:String,
                           required:true,
                           default:"No Heading"
                        },
                    createdAt:{type:Date,
                              default:new Date()
                        },
                    content:{type:String,
                            required:true
                        },
                    images:[]                                             
                    })
const blogs=mongoose.model("Blogsdata",blogschema)
module.exports=blogs
