import { Request, Response } from "express";
import prisma from "../db";

export const getMessages = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      messages: true,
    },
  });
  res.json({ data: conversation?.messages || [] });
};

export const createMessage = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const { content } = req.body;
  const message = await prisma.message.create({
    data: {
      content,
      conversationId,
      senderType: "user",
    },
  });
  res.status(201).json({ data: message });
};
