import mongoose from "mongoose";

export default async function connection(){
    const db = await mongoose.connect('mongodb+srv://arifzain74_db_user:n2HMZCiWc9o1H4FJ@cluster0.dnnl1z5.mongodb.net/BackendExpress')
    console.log("database connected");
    
    return db
}