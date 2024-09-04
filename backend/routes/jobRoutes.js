import express from "express";
import {
  createJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJobDetails,
} from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/jobs", createJob); // Create a new job
router.get("/jobs", getAllJobs); // Get all jobs
router.put("/jobs/:id", updateJob); // Update a job by ID
router.delete("/jobs/:id", deleteJob); // Delete a job by ID
router.route("/jobs/:id").get(getJobDetails);

export default router;
