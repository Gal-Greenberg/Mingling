const { SignUpCommand, InitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");
const client = require("../config/cognito");

exports.handleRegister = async (email, password) => {
    const command = new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [{
            Name: "email",
            Value: email,
        },],
    });

    const response = await client.send(command);
    return response.UserSub;
}

exports.handleLogin = async (email, password) => {
    const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    });

    const response = await client.send(command);
    return response.AuthenticationResult;
}