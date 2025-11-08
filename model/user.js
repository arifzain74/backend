import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    pass:{type:String}
})

export default mongoose.models.users||mongoose.model('users',userScheme)