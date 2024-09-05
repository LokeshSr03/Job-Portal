import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
  getAppliedJobs,
  getJobsByFilter,
  applyForJob,
} from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/", createJob); // Create a new job
router.get("/", getAllJobs); // Get all jobs
router.put("/:id", updateJob); // Update a job by ID
router.delete("/:id", deleteJob); // Delete a job by ID
router.route("/:id").get(getJobDetails);

router.get("/filter", getJobsByFilter); // Get all jobs with filters
router.post("/apply/:jobId", applyForJob); // Apply for a job
router.get("/applied/:userId", getAppliedJobs); // Get jobs applied by a user

export default router;
