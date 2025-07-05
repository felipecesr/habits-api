import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";
import { createMessage, getMessages } from "../handlers/messages";

const messagesRouter = Router({ mergeParams: true });

messagesRouter.get("/", getMessages);

messagesRouter.post(
  "/",
  body("content").isString(),
  handleInputErrors,
  createMessage
);

export default messagesRouter;
