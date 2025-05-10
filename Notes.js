const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnnoucementSchema = new Schema({
  description: {
    type: String,
    require: true,
  },
  pdf: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", AnnoucementSchema);
