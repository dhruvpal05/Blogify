const JWT = require("jsonwebtoken");

const secret = "Superman";

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImgUrl: user.profileImgUrl,
    }
    const token = JWT.sign(payload,secret);

    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    validateToken,
    createTokenForUser,
}