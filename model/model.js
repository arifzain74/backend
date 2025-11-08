import mongoose from "mongoose";

const dataScheme = new mongoose.Schema({
    name:{type:String},
    phone:{type:Number},
    image:{type:String}
})

export default mongoose.models.Datas||mongoose.model('datas',dataScheme)