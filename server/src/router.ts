import { Router } from "express";
import contactsRouter from "./routes/contacts";
import conversationsRouter from "./routes/conversations";

const router = Router();

router.use("/contacts", contactsRouter);
router.use("/conversations", conversationsRouter);

export default router;
