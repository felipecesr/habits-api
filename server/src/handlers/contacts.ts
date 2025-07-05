import { Request, Response } from "express";
import prisma from "../db";

type ContactParams = {
  contactId: string;
};

type ContactBody = {
  name: string;
  whatsappNumber: string;
};

type ContactRequest = Request<ContactParams, {}, ContactBody>;

export const getContacts = async (req: ContactRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      contacts: true,
    },
  });
  res.json({ data: user?.contacts || [] });
};

export const getOneContact = async (req: ContactRequest, res: Response) => {
  const contactId = req.params.contactId;
  const contact = await prisma.contact.findFirst({
    where: { id: contactId, userId: req.user.id },
  });
  res.json({ data: contact });
};

export const createContact = async (req: ContactRequest, res: Response) => {
  const { name, whatsappNumber } = req.body;
  const contact = await prisma.contact.create({
    data: {
      name,
      whatsappNumber,
      userId: req.user.id,
    },
  });
  res.status(201).json({ data: contact });
};

export const updateContact = async (req: ContactRequest, res: Response) => {
  const contactId = req.params.contactId;
  const { name, whatsappNumber } = req.body;
  const contact = await prisma.contact.update({
    where: { id_userId: { id: contactId, userId: req.user.id } },
    data: {
      name,
      whatsappNumber,
    },
  });
  res.json({ data: contact });
};

export const deleteContact = async (req: ContactRequest, res: Response) => {
  const contactId = req.params.contactId;
  const contact = await prisma.contact.delete({
    where: { id_userId: { id: contactId, userId: req.user.id } },
  });
  res.json({ data: contact });
};
