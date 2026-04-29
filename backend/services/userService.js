const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { handleRegister, handleLogin, updatePassword } = require("./cognitoService");
const { validateDisplayName, validatePassword } = require("../utils/validators");

exports.registerUser = async (displayName, email, password) => {
    const validName = validateDisplayName(displayName);
    const validPassword = validatePassword(password);
    const cognitoId = await handleRegister(email, validPassword);

    const user = await User.create({
        displayName: validName,
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

exports.updateUser = async (user, displayName, password) => {
    if (displayName !== undefined) {
        // user.displayName = displayName;
        user.displayName = validateDisplayName(displayName);
        await user.save();
    }

    if (password) {
        const validPassword = validatePassword(password);
        await updatePassword(user.cognitoId, validPassword);
    }

    return user;
}