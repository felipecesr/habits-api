import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";


export const createNewUser = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hash,
      name: req.body.name,
      whatsappNumber: req.body.whatsappNumber,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  
  if (!user) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid username or password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
