import { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { SessionToken } from "../handlers/user";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token as SessionToken;
};

export const protect: RequestHandler = (req: Request, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as Request["user"];
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401).send("Not authorized");
    return;
  }
};
