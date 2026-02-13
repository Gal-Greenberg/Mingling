const mongoose = require("mongoose")

const userSessionInterestSchema = new mongoose.Schema({
    status : {
        type: String,
        enum: ['interested', 'going'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true
    }
}, { timestamps: true });

userSessionInterestSchema.index(
  { userId: 1, sessionId: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserSessionInterest", userSessionInterestSchema);
