import { Request, Response, NextFunction } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export type SessionToken = string & { readonly _brand: unique symbol };

interface UserRequest {
  body: {
    email?: string;
    password?: string;
  };
}

interface AuthResponse {
  token: SessionToken;
}

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        name: req.body.name,
        whatsappNumber: req.body.whatsappNumber,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    (error as any).type = "auth";
    next(error);
  }
};

export const signin = async (
  req: Request<{}, {}, UserRequest["body"]>,
  res: Response<AuthResponse | { error: string }>
) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!user) {
    res.status(401).send({ error: "Invalid username or password" });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).send({ error: "Invalid username or password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
