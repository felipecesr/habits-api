import { Router } from "express";
import { body } from "express-validator";
import messagesRouter from "./messages";
import streamRouter from "./stream";
import {
  createConversation,
  deleteConversation,
  getConversations,
  getOneConversation,
} from "../handlers/conversations";
import { handleInputErrors } from "../modules/middleware";

const conversationsRouter = Router({ mergeParams: true });

conversationsRouter.get("/", getConversations);

conversationsRouter.post(
  "/",
  body("contactId").isString(),
  handleInputErrors,
  createConversation
);

conversationsRouter.get("/:conversationId", getOneConversation);

conversationsRouter.delete("/:conversationId", deleteConversation);

conversationsRouter.use("/:conversationId/messages", messagesRouter);
conversationsRouter.use("/:conversationId/stream", streamRouter);

export default conversationsRouter;
