import mongoose from "mongoose";

const GoogleSchema = new mongoose.Schema({
  sub: {
    type: String,
    required: true
  },
  given_name: {
    type: String,
    required: true
  },
  family_name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
});

export const guser = mongoose.model("guser", GoogleSchema);
