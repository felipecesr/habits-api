import { Router } from "express";

const webhooksRouter = Router({ mergeParams: true });

webhooksRouter.get("/", (req, res) => {});

webhooksRouter.post("/", (req, res) => {});

export default webhooksRouter;
