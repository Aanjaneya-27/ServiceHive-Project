// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }

// const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {

//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {

//       res.status(401).json({
//         message: "No token found",
//       });

//       return;
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     );

//     req.user = decoded;

//     next();

//   } catch (error) {

//     res.status(401).json({
//       message: "Invalid Token",
//     });

//   }

// };

// export default authMiddleware;

import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      res.status(401).json({
        message: "No token found",
      });

      return;
    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid Token",
    });

  }

};

export default authMiddleware;