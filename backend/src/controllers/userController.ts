// src/userController.ts
import { Request, Response } from "express";
import { users, scores, questions, IUser, IScore } from "../models/userModel.js";

//response helper
const resOk = (res: Response, data: any) => res.json({ success: true, data });
const resErr = (res: Response, message: string, code = 400) => res.status(code).json({ success: false, message });

export const getUser = (req: Request, res: Response) => {
  const username = req.params.username;
  //console.log("GET /users/:username =>", username);

  const found = users.find(u => u.username === username);
  if (!found) {
    res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, data: found });
};

export const createUser = (req: Request, res: Response) => {
  const { username, password } = req.body as Partial<IUser>;

  if (!username || !password) {
    return resErr(res, "username and password required");
  }
  const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
  if (exists) return resErr(res, "username already exists");
  const newUser: IUser = { username, password };
  users.push(newUser);
  resOk(res, { username: newUser.username });
};

export const upsertScore = (req: Request, res: Response) => {
  const { username, score } = req.body as Partial<IScore>;
  if (!username || typeof score !== "number") 
    return resErr(res, "username and numeric score required");
  const idx = scores.findIndex(s => s.username.toLowerCase() === username.toLowerCase());
  if (idx === -1) {
    const ns: IScore = { username, score };
    scores.push(ns);
    return resOk(res, ns);
  } else {
    scores[idx].score = score;
    return resOk(res, scores[idx]);
  }
};

export const getAllQuestions = (_req: Request, res: Response) => {
  resOk(res, questions);
};
