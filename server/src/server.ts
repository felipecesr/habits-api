import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./router";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { createMessageWebhook, registerWebhook } from "./handlers/webhooks";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);
app.get("/webhooks", registerWebhook);
app.post("/webhooks", createMessageWebhook);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === "auth") {
    res.status(401).json({ error: "unauthorized" });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
