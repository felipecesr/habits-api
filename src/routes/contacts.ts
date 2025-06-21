import { Router } from "express";

const contactsRouter = Router({ mergeParams: true });

contactsRouter.get("/", (req, res) => {
  res.json({ message: "contacts" });
});

contactsRouter.post("/", (req, res) => {});

contactsRouter.get("/:contactsId", (req, res) => {});

contactsRouter.put("/:contactsId", (req, res) => {});

contactsRouter.delete("/:contactsId", (req, res) => {});

export default contactsRouter;
