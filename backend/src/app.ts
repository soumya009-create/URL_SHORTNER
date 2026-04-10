import dotenv from "dotenv";
dotenv.config()
import express from "express";
import { encode } from "./utils.js";
import { Counter } from "./models/Counter.model.js";
import { Url } from "./models/Url.model.js";
const app = express()

app.use(express.json())



app.post('/shorten', async (req, res) => {
    let { longUrl } = req.body;

    // Check if URL has http/https, if not, add it
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        longUrl = `https://${longUrl}`;
    }

    const counter = await Counter.findOneAndUpdate(
        { _id: "url_id" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const shortCode = encode(counter.seq);
    await Url.create({ longUrl, shortCode });

    res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});
app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;

    // Find and increment click count in one go
    const urlEntry = await Url.findOneAndUpdate(
        { shortCode },
        { $inc: { clickCount: 1 } }
    );

    if (urlEntry) {
        return res.redirect(urlEntry.longUrl);
    } else {
        res.status(404).json({ error: "Link not found" });
    }
});


export default app