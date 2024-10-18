import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashpassword });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
