import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const custSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
})
custSchema.methods.generateToken = async function(){
    const JWT_SECRET_KEY = "ROHITHBHAT"
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
        },
        JWT_SECRET_KEY
        

        
        
        )
        
    } catch (error) {
        console.log(error)
        
    }
}

export const Customer = mongoose.model("Customer",custSchema)
