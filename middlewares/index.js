export const authorizationMiddleware = async (req, res, next) => {
  const reqSecret = req.headers["x-api-secret"];
  if (reqSecret !== process.env.MY_SECURE_SECRET) {
    return res.status(401).json({ message: "YOU ARE NOT ALLOWED !" });
  }
  next();
};
