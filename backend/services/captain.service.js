const captainSchema = require('../modles/captainSchema');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicletype){
        throw new Error("All files required !");
    }

    const captain = captainSchema.create({
        fullname: {
            firstname,
            lastname, 
           
        },
        email, 
        password , 
        color,
        capacity, 
        vehicleType

    });
}