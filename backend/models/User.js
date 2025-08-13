const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      data: { type: Buffer, default: null },
      contentType: { type: String, default: "image/png" },
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
