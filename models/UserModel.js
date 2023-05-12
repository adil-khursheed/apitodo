import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be of atleast 8 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      _id: { type: String, required: true },
      title: String,
      completed: Boolean,
      createdAt: Date,
    },
  ],
  completedTasks: [
    {
      _id: { type: String, required: true },
      title: String,
      completed: Boolean,
    },
  ],
  activeTasks: [
    {
      _id: { type: String, required: true },
      title: String,
      completed: Boolean,
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  otp: Number,
  otp_expire: Date,
  resetPasswordOtp: Number,
  resetPasswordOtpExpire: Date,
});

// to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// to generate jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

// to compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// to delete user on NOT verifying
userSchema.index({ otp_expire: 1 }, { expireAfterSeconds: 0 });

export const User = mongoose.model("User", userSchema);
