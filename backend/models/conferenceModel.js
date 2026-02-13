const mongoose = require("mongoose")

const conferenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "endDate must be greater than startDate",
        }
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true });

conferenceSchema.index({ organizationId: 1 });

module.exports = mongoose.model("Conference", conferenceSchema);
