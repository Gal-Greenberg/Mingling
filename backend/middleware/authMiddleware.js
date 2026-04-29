const { CognitoJwtVerifier } = require("aws-jwt-verify");
const User = require("../models/userModel");

const verifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: "access",
    clientId: process.env.COGNITO_CLIENT_ID,
});

module.exports.authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "No token" });
        }

        const token = req.headers.authorization.split(" ")[1];
        const payload = await verifier.verify(token);
        const cognitoId = payload.sub;
        req.user = await User.findOne({ cognitoId });

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};