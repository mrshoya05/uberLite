const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema(
    {
        fullname: {
            firstname:{ 
                type: String,
                require: true,
                minlegth: [3, "First name must be atleast 3 character "],

            }, 
            lastname: {
                type: String,
                minlegth: [3, "Last name must be atleast 3 character "],
            }
        }, 
        email: {
            type: String,
            require: true, 
            unique: true,
            minlength: [5, "Enter valid   email address ! "]
        }, 
        password: {
            type: String,
             require: true,
             select: false 
        }, 
        soketId: {
            type : String
        }
    },
)

// userSchema.methods.generateAuthToken = ()=>{
//     const token = jwt.sign({
//         _id: this._id
//     }, process.env.JWT_SECRET)
//     return token;
// }
userSchema.methods.comparePassword = async function (password) {
    if (!this.password) {
        throw new Error("Password hash is not available on this user object.");
    }
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
     
    );
    return token;
};



userSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}



const userModel = mongoose.model('user', userSchema);

module.exports = userModel;