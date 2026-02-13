const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lecturerName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startTime;
            },
            message: "endTime must be greater than startTime",
        }
    },
    conferenceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conference",
        required: true
    }
}, { timestamps: true });

sessionSchema.index({ conferenceId: 1 });

module.exports = mongoose.model("Session", sessionSchema);
