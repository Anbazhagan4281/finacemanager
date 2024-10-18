import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials!" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", { expiresIn: "12h" });

    res.status(200).json({ token });
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
