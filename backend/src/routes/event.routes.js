import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find();
  console.log("GET /api/events → count:", events.length);
  res.json(events);
});

router.post("/upsert", async (req, res) => {
  console.log("POST /api/events/upsert HIT");
  console.log("BODY:", req.body);

  try {
    const data = req.body;

    const existing = await Event.findOne({
      sourceUrl: data.sourceUrl,
    });

    if (!existing) {
      const created = await Event.create({
        ...data,
        status: "new",
        lastScrapedAt: new Date(),
      });

      console.log("EVENT CREATED:", created._id);
      return res.json(created);
    }

    console.log("EVENT ALREADY EXISTS");
    res.json(existing);
  } catch (err) {
    console.error("UPSERT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
