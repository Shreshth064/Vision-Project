const mongoose=require('mongoose');

const userSchema= new mongoose.Schema(
    {
        name: String,
    email:String,
    contact: String,
    company: String,
    message: String
})

const UserModel= mongoose.model("contacts",userSchema);

module.exports=UserModel;