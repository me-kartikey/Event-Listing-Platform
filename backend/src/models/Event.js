import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    datetime: Date,

    venueName: String,
    address: String,

    city: {
      type: String,
      default: "Sydney",
    },

    description: String,

    category: [String],

    imageUrl: String,

    source: {
      type: String,
      required: true,
    },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["new", "updated", "inactive", "imported"],
      default: "new",
    },

    lastScrapedAt: Date,

    importedAt: Date,
    importedBy: String,
    importNotes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
