import mongoose from "mongoose"
interface U {
    longUrl: string,
    shortCode: string,
    clickCount: number,
    createdAt: Date
}

const UrlSchema = new mongoose.Schema<U>({
    longUrl: { type: String, required: true },
    shortCode: { type: String, unique: true },
    clickCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
})

export const Url = mongoose.model<U>("Url", UrlSchema)