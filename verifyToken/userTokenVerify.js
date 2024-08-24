// import jwt from "jsonwebtoken";

// const userVerify = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token || token.startsWith("Bearer")) {
//     return res.status(404).json({ message: "token not found" });
//   }

//   try {
//     const decode = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log("user verify token err:", error);
//   }
// };

// const adminProtect = (req, res, next) => {
//   try {
//     if (req.user.email !== "admin") {
//       return res.status(404).json({ message: "admin only" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// export { userVerify, adminProtect };

// userTokenVerify.js


import jwt from "jsonwebtoken";

const userVerify = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token not found or invalid" });
  }

  try {
    const decode = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Token verification failed" });
  }
};

const adminProtect = (req, res, next) => {
  try {
    if (req.user.email !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
  } catch (error) {
    console.error("Admin protection error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { userVerify, adminProtect };

