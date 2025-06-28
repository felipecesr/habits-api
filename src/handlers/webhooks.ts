// @ts-nocheck
import { Request, Response } from "express";
import prisma from "../db";

export const registerWebhook = (req: Request, res: Response) => {
  if (
    req.query["hub.mode"] == "subscribe" &&
    req.query["hub.verify_token"] == "seu_token"
  ) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.sendStatus(400);
  }
};

export const createMessageWebhook = async (req: Request, res: Response) => {
  const body = req.body.event.body;
  const contactNumber = body.entry[0].changes[0].value.messages[0].from;
  const content = body.entry[0].changes[0].value.messages[0].text.body;
  const userNumber =
    body.entry[0].changes[0].value.metadata.display_phone_number;
  const conversation = await prisma.conversation.findFirst({
    where: {
      user: { whatsappNumber: userNumber },
      contact: { whatsappNumber: contactNumber },
    },
  });
  const message = await prisma.message.create({
    data: {
      content,
      conversationId: conversation?.id,
      senderType: "contact",
    },
  });
  res.status(201).json({ data: message });
};
