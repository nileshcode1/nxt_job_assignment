import { Request, Response, NextFunction } from "express";
import pool from "../db";
import { Job } from "../models/job";

// Create a new job posting
export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, company, location, salary, description } = req.body;

    if (!title || !company) {
      res.status(400).json({ message: "Title and company are required." });
      return;
    }

    const [result] = await pool.execute(
      "INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)",
      [title, company, location, salary, description]
    );

    const insertId = (result as any).insertId;

    res
      .status(201)
      .json({ id: insertId, title, company, location, salary, description });
  } catch (error) {
    console.error(error);
    next(error); 
  }
};

export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [rows] = await pool.execute("SELECT * FROM jobs");
    res.json(rows);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const [rows]: any = await pool.execute("SELECT * FROM jobs WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, company, location, salary, description } = req.body;

    const [result]: any = await pool.execute(
      "SELECT * FROM jobs WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    await pool.execute(
      "UPDATE jobs SET title = ?, company = ?, location = ?, salary = ?, description = ? WHERE id = ?",
      [title, company, location, salary, description, id]
    );

    res.json({ id: Number(id), title, company, location, salary, description });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.execute(
      "SELECT * FROM jobs WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    await pool.execute("DELETE FROM jobs WHERE id = ?", [id]);

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
