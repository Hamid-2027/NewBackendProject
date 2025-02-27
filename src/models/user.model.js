import mongoose, { Schema } from "mongoose";
import { jwt } from "jsonwebtoken";
import { bcrypt} from 'bcrypt'


const userSchema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avater:{
        type: String, // cloudinary url
        required:true,
    },
    coverImage:{
        type: String, // cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }
},
{
    timestamps:true
}
)
// used mongoose hook to encript 
userSchema.pre("save", async function (next) {// don't use the arrow func b/c thier is not this reference 
    if(!this.isModified("passord")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// custom methods
userSchema.methods.isPasswordCorrect = async function
(passord){
  return await bcrypt.compare(passord, this.passord)
} 
// ANOTHER method inject in schema 
userSchema.methods.generateAccessToken= function (){// jwt token
  return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= function (){// difference : refresh token has less data b/c it rapidly changes
    jwt.sign(
    {
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User",userSchema);

