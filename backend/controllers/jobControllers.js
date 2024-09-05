import Job from "../models/job.js";
import asynchandler from "express-async-handler";
import User from "../models/userModel.js";

const createJob = asynchandler(async (req, res) => {
  const { companyName, position, contract, location } = req.body;
  const newJob = new Job({ companyName, position, contract, location });
  await newJob.save();
  res.status(201).json(newJob);
});

const getAllJobs = asynchandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});

const updateJob = asynchandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const updatedData = req.body;
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  res.status(200).json(updatedJob);
});

const deleteJob = asynchandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  await Job.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Job deleted successfully" });
});

// @desc    Get a job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobDetails = asynchandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404).json({ message: "Job not found" });
  } else {
    res.json(job);
  }
});

//new

const getJobsByFilter = asynchandler(async (req, res) => {
  try {
    const { companyName, location, contract } = req.query;
    const filter = {};

    if (companyName) filter.companyName = new RegExp(companyName, "i");
    if (location) filter.location = new RegExp(location, "i");
    if (contract) filter.contract = contract;

    // Check what is being passed in the filter
    console.log("Filter: ", filter);

    const jobs = await Job.find(filter).populate("applicants", "name email");

    res.json(jobs);
  } catch (error) {
    console.error("Error in getJobsByFilter: ", error); // Log the error
    res.status(500).json({ message: error.message || "Server error" });
  }
});

const applyForJob = asynchandler(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.body; // userId should be passed in the request body

  const job = await Job.findById(jobId);
  const user = await User.findById(userId);

  if (!job || !user)
    return res.status(404).json({ message: "Job or User not found" });

  if (job.applicants.includes(userId))
    return res.status(400).json({ message: "User already applied" });

  job.applicants.push(userId);
  await job.save();

  user.appliedJobs.push(jobId);
  await user.save();

  res.json({ message: "Applied successfully" });
});

const getAppliedJobs = asynchandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate("appliedJobs");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user.appliedJobs);
});

export {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
  getAppliedJobs,
  getJobsByFilter,
  applyForJob,
};
