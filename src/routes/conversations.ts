import { Router } from "express";
import messagesRouter from "./messages";
import streamRouter from "./stream";

const conversationsRouter = Router({ mergeParams: true });

conversationsRouter.get("/", (req, res) => {
  res.json({ message: "conversations" });
});

conversationsRouter.post("/", (req, res) => {});

conversationsRouter.get("/:conversationsId", (req, res) => {});

conversationsRouter.delete("/:conversationsId", (req, res) => {});

conversationsRouter.use("/:conversationsId/messages", messagesRouter);
conversationsRouter.use("/:conversationsId/stream", streamRouter);

export default conversationsRouter;
