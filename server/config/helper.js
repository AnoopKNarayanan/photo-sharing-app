import jsonwebtoken from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    var token;
    if(req.headers && 'authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    
        if(!token)
            return res.status(403).send({ auth: false, message: 'Token unavailable'});
        else{
            jsonwebtoken.verify(token, process.env.JWT_SECRET,
                (err, decoded) => {
                    if(err)
                        return res.status(500).send({ auth: false, message: 'Token authentication failed'});
                    else {
                        req._id = decoded._id;
                        next();
                    }
                });
        }
}