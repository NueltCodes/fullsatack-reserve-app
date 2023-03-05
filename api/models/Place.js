const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  description: String,
  extraInfo: String,
  photos: [String],
  images: [String],
  perks: [String],
  roomPerks: [String],
  safetyGuide: [String],
  otherSpace: [String],
  rules1: String,
  rules2: String,
  rules3: String,
  rules4: String,
  rules5: String,
  checkIn: Number,
  checkOut: Number,
  price: Number,
  maxGuests: Number,
  rooms: Number,
  bed: Number,
});

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;
