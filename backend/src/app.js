import express from "express";
import cors from "cors";
import passport from "passport";


import "./config/passport.js";
import eventRoutes from "./routes/event.routes.js";
import leadRoutes from "./routes/lead.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use("/api/events", eventRoutes);
app.use("/api/leads", leadRoutes);

app.get("/", (req, res) => {
  res.send("Event Platform Backend Running");
});

export default app;
