import dataSchema from "./model/model.js";
import userSchema from  "./model/user.js";
import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const {sign} = pkg;


export async function login(req,res) {
    const {email,pass} = req.body
    if(!(email,pass))
        return res.status(500).send({msg:"Empty Fields"})
    const user = await userSchema.findOne({email})

    if(!user)
        return res.status(500).send({msg:"User does not exist"})
    const success = await bcrypt.compare(pass,user.pass)

    if(success!=true)
        return res.status(500).send({msg:"Invalid Password"})

    const token = await sign({userID:user._id},process.env.JWT_TOKEN,{expiresIn:"24h"})
    res.status(200).send({token})
}

export async function addUser(req,res){
    // const{name,email,pass,cpass} = req.body
    const{name,email,pass} = req.body
    if(!(name&&email&&pass)){
        return res.status(500).send({msg:"invalid input"})
    }
    // else if(pass!=cpass){
    //     return res.status(500).send({msg:"Password mismatch"})
    // }
    
        bcrypt.hash(pass,10).then((hpwd)=>{
            userSchema.create({name,email,pass:hpwd}).then(()=>{
                res.status(201).send({msg:"successful"})
            })
        }).catch((error)=>{
            console.log(error);
            
        })
}

export async function addData(req,res){
    console.log(req.body);

    const {...Datas} = req.body
    await dataSchema.create({...Datas}).then(()=>{
        res.status(201).send({msg:"successful"})
    }).catch((error)=>{
        res.status(404).send({error:error})
    })
}

export async function getData(req,res){
    const data = await dataSchema.find()
    res.status(200).send(data)
}

export async function getoneData(req,res){
    const data = await dataSchema.findOne({_id:req.params.id})
    res.status(200).send(data)
}

export async function updateData(req,res){
    const {...Datas} = req.body
    await dataSchema.updateOne({_id:req.params.id},{$set:{...Datas}}).then(()=>{
        res.status(201).send({msg:"updated"})
    }).catch((error)=>{
        res.status(500).send({error:error})
    })
}

export async function deleteData(req,res){
    
    console.log();
    
    await dataSchema.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).send({msg:"Deleted"})
    }).catch((error)=>{
        res.status(500).send({error:error})
    })
}