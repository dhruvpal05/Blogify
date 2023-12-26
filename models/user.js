const mongoose = require('mongoose');


const userSchema = new Schema({
    fullName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    salt:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    profileImgUrl:{
        type:String,
        default:'/images/defaultpfp.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    }
},
{timestamps:true,});

const user  = mongoose.model('user',userSchema);

module.exports = {user};