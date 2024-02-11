import {Customer} from "../models/userModel.js"

const register = async(req,res)=>{
    try {
        const {username,email,phone,password} = req.body;
        const userExist = await Customer.findOne({email})
        if(userExist){
            return res.status(400).json({message:"Email already exists"})
        }
        const userCreated = await Customer.create({username,email,phone,password})
        return res.status(201).json({message:userCreated,token:await userCreated.generateToken(),userId:userCreated._id.toString(),})
        
    } catch (error) {
        next(error)
        
    }
}

const login = async(req,res)=>{
    try{
    const {email,password} = req.body;
    const userExist = await Customer.findOne({email})
    if(!userExist){
        return res.status(400).json({message:"Invalid Credentials"})

    }
    if(userExist.password===password){
   
        return res.status(200).json({message:"Login Successfull",token:await userExist.generateToken(),userId:userExist._id.toString(),})
    }else{
        return res.status(401).json({message:"Invalid email or password"})
    }
}catch(error){
    return res.status(500).json({message:"Internal Server Error"})
}
}
export {register,login}