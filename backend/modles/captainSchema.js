const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "First name should be at least 3 characters"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name should be at least 3 characters"],
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            minlength: [3, "Color must be valid"],
        },
        plate: {
            type: String,
            required: [true, "Plate number is required"],
            minlength: [3, "Plate number should be valid"]
        },
        capacity: {
            type: Number,
            required: [true, "Capacity is required"],
            min: [1, "Capacity should be at least 1"]
        },
        vehicleType: {
            type: String,
            required: [true, "Vehicle type is required"],
            enum: ['car', 'motorcycle', 'auto']
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            }
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};


captainSchema.methods.comparePassword = async function (password) {
    if (!this.password) {
        throw new Error("Password hash is not available on this user object.");
    }
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async (password)=>{
    return await bcrypt.hash(password, 10);
}

const captainModel= mongoose.model('Captain', captainSchema);

module.exports=captainModel;
