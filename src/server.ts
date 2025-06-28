import express from "express";
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

export default app;
