import jwt from "jsonwebtoken";

async function authToken(req,res,next){
    try{
        const token = req.headers.token
        console.log(token)
        if(!token){
            return res.status(400).json({
                message : "User not login",
                error : true,
                success : false 
            })
        }
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            req.userId = decoded?._id
            console.log(req.userId)
            next()
        });

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            data : [],
            error : true,
            success : false 
        })
    }
}

export default authToken;