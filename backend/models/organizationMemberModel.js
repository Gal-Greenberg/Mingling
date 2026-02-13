const mongoose = require("mongoose")

const organizationMemberSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'member'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true });

organizationMemberSchema.index(
  { userId: 1, organizationId: 1 },
  { unique: true }
);

module.exports = mongoose.model("OrganizationMember", organizationMemberSchema);
