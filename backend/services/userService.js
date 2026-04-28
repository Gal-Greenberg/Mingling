const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { handleRegister, handleLogin } = require("./cognitoService");

exports.registerUser = async (displayName, email, password) => {
    const cognitoId = await handleRegister(email, password);

    const user = await User.create({
        displayName,
        email,
        cognitoId,
    });

    return user;
};

exports.loginUser = async (email, password) => {
    const tokens = await handleLogin(email, password);

    const decoded = jwt.decode(tokens.IdToken);
    const cognitoId = decoded.sub;
    console.log(cognitoId);
    

    const user = await User.findOne({ cognitoId });

    return { tokens, user };
}