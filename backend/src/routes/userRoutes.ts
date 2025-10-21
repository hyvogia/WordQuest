// src/userRoutes.ts
import { Router } from "express";
import {
  // getAllUsers,
  getUser,
  createUser,
  // updateUser,
  // deleteUser,
  // getAllScores,
  // getScore,
  upsertScore,
  // deleteScore,
  getAllQuestions,
  // getQuestion,
  // addQuestion,
  // updateQuestion,
  // deleteQuestion
} from "../controllers/userController.js";

const router = Router();

/* Users */
// router.get("/users", getAllUsers);
router.get("/users/:username", getUser);
router.post("/users", createUser);
// router.put("/users/:username", updateUser);
// router.delete("/users/:username", deleteUser);

/* Scores */
// router.get("/scores", getAllScores);
// router.get("/scores/:username", getScore);
router.post("/scores", upsertScore);
// router.put("/scores", upsertScore);
// router.delete("/scores/:username", deleteScore);

/* Questions */
router.get("/questions", getAllQuestions);
// router.get("/questions/:index", getQuestion);
// router.post("/questions", addQuestion);
// router.put("/questions/:index", updateQuestion);
// router.delete("/questions/:index", deleteQuestion);

export default router;
