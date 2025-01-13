// src/routes/jobs.ts
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - company
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the job
 *         title:
 *           type: string
 *           description: The job title
 *         company:
 *           type: string
 *           description: The company offering the job
 *         location:
 *           type: string
 *           description: The location of the job
 *         salary:
 *           type: number
 *           format: float
 *           description: The salary offered
 *         description:
 *           type: string
 *           description: Detailed job description
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date the job was created
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date the job was last updated
 *       example:
 *         id: 1
 *         title: Software Engineer
 *         company: NxtJob AI
 *         location: India
 *         salary: 90000
 *         description: Develop software applications.
 *         created_at: 2025-01-12T10:00:00.000Z
 *         updated_at: 2025-01-12T10:00:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: The job managing API
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: The job was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", createJob);

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve a list of jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       500:
 *         description: Server error
 */
router.get("/", getAllJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getJobById);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by the id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: The job was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateJob);

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     summary: Remove the job by id
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The job ID
 *     responses:
 *       200:
 *         description: The job was deleted
 *       404:
 *         description: Job not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteJob);

export default router;
