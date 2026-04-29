exports.validateDisplayName = (displayName) => {
    if (displayName === undefined) {
        return;
    }

    if (typeof displayName !== "string") {
        throw new Error("displayName must be a string");
    }

    const trimmed = displayName.trim();

    if (trimmed.length < 2 || trimmed.length > 50) {
        throw new Error("displayName must be between 2 and 50 characters");
    }

    return trimmed;
};

exports.validatePassword = (password) => {
    if (typeof password !== "string") {
        throw new Error("password must be a string");
    }

    if (password.length < 6 || password.length > 20) {
        throw new Error("password must be between 6 and 20 characters");
    }

    return password;
};