import { Request, Response } from "express";
import { users } from "../models/userModel.js";

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};
