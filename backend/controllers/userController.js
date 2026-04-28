const { registerUser, loginUser } = require("../services/userService");

exports.register = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
        const user = await registerUser(displayName, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", data });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    
}
