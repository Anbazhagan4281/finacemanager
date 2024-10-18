import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
    role?: string;
	isActive?: boolean;	
}

const userSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    isActive: { type: Boolean, required: true, default: true }
})

export default mongoose.model<IUser>("User", userSchema);