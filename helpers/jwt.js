const expressjwt=require("express-jwt")
require("dotenv").config();


function autJwt(){
    const secret=process.env.secret;
    return expressjwt({
        secret:secret,
        algorithms:['HS256']
    })
}
module.exports=autJwt;