import express from "express";

const router = express.Router();


import Lead from "../models/Lead.js";



/**
 * Save user email when clicking GET TICKETS
 */
router.post("/", async (req, res) => {
  try {
    const { email, consent, eventId } = req.body;

    const lead = await Lead.create({
      email,
      consent,
      eventId,
    });

    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

