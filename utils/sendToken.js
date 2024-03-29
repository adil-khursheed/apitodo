export const sendToken = (res, user, statusCode, message) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };

  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    verified: user.verified,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user: userData,
  });
};
