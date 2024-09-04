import Job from "../models/job.js";
import asynchandler from "express-async-handler";

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

export { createJob, updateJob, deleteJob, getAllJobs, getJobDetails };
