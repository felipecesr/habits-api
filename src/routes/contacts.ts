import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";
import {
  createContact,
  deleteContact,
  getContacts,
  getOneContact,
  updateContact,
} from "../handlers/contacts";

const contactsRouter = Router({ mergeParams: true });

contactsRouter.get("/", getContacts);

contactsRouter.post(
  "/",
  body("name").isString(),
  body("whatsappNumber").isNumeric(),
  handleInputErrors,
  createContact
);

contactsRouter.get("/:contactsId", getOneContact);

contactsRouter.put(
  "/:contactsId",
  body("name").optional(),
  body("whatsappNumber").optional(),
  updateContact
);

contactsRouter.delete("/:contactsId", deleteContact);

export default contactsRouter;
