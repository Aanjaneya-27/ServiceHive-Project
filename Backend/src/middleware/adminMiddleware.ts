import {
  Request,
  Response,
  NextFunction,
} from "express";

const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  try {

    if (
      req.user.role !== "admin"
    ) {

      res.status(403).json({
        message:
          "Access Denied. Admin Only",
      });

      return;
    }

    next();

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

export default adminMiddleware;