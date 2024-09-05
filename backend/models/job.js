import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: { type: String }, // URL of the dummy image
  description: { type: String },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who applied
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
