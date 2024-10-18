import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"


interface AuthRequest extends Request {
	user?: string | jwt.JwtPayload
}

export const verifyToken = (req:AuthRequest, res: Response, next: NextFunction): void => {
	const token = req.header('Authorization')?.split(" ")[1]
	if(!token) {
		res.status(401).json({ error: "No token provided" })
		return;
	}
	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET || "")
		req.user = decode;
		next()
	} catch(err) {
		res.status(401).json({ error: "Token is not Valid" })
	}
}