const { registerUser, loginUser, updateUser } = require("../services/userService");

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
    try {
        const { displayName, password } = req.body;
        const updatedUser = await updateUser(req.user, displayName, password);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Update failed", error: error.message });
    }
}
