import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/middleware";

const messagesRouter = Router({ mergeParams: true });

messagesRouter.get("/", (req, res) => {
  res.json({ message: "messages" });
});

messagesRouter.post("/", body("content").isString(), handleInputErrors, (req, res) => {
  res.json({ message: "messages" });
});

export default messagesRouter;
