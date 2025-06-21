import { Router } from "express";

const streamRouter = Router({ mergeParams: true });

streamRouter.get("/", (req, res) => {});

export default streamRouter;
