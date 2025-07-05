// @ts-nocheck
import { Request, Response } from "express";
import prisma from "../db";

export const getConversations = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      conversations: true,
    },
  });
  res.json({ data: user?.conversations || [] });
};

export const getOneConversation = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const conversation = await prisma.conversation.findFirst({
    where: { id: conversationId, userId: req.user.id },
  });
  res.json({ data: conversation });
};

export const createConversation = async (req: Request, res: Response) => {
  const { contactId } = req.body;
  const userId = req.user.id;

  // Verifica se o contato pertence ao usuário
  const contact = await prisma.contact.findFirst({
    where: {
      id: contactId,
      userId: userId,
    },
  });

  if (!contact) {
    res
      .status(404)
      .json({ error: "Contato não encontrado para este usuário." });
    return;
  }

  // Evita criar duplicata de conversa
  const existing = await prisma.conversation.findFirst({
    where: {
      userId: userId,
      contactId: contactId,
    },
  });

  if (existing) {
    res.json({ data: existing });
    return;
  }

  const conversation = await prisma.conversation.create({
    data: {
      userId,
      contactId,
    },
  });
  res.status(201).json({ data: conversation });
};

export const deleteConversation = async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;
  const conversation = await prisma.conversation.delete({
    where: { id: conversationId, userId: req.user.id },
  });
  res.json({ data: conversation });
};
