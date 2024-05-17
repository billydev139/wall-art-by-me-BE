import Users from "../models/auth.js"
export const isAuth = async (req, res, next) => {
  try {
    let token = req?.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return sendResponse(res, false, "You must be logged in");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await Users.findById(decoded._id);

    next();
  } catch (error) {
    return sendError(res, error);
  }
};
