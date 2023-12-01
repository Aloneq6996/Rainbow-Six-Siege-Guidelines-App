// imports

const express = require("express");
const cors = require("cors");
const fs = require("fs").promises
const bodyParser = require("body-parser")
const R6API = require("r6api.js")


// declarations 

const app = express();
const PORT = 6996;
const SETTINGS_FILE_PATH = "./assets/settings.json";

// app

app.use(cors());
app.use(bodyParser.json());

// routes

// TO REMOVE
app.get("/api/loadSettings", async (req, res) => {
    try {
        const data = await fs.readFile(SETTINGS_FILE_PATH, "utf-8");
        const settings = JSON.parse(data);
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to load settings" });
    }
});

app.get("/api/statistics", async (req, res) => {
    const data = await fs.readFile(SETTINGS_FILE_PATH, "utf-8");
    const settings = JSON.parse(data)
    const { email, password, username, platform } = settings;

    const r6api = new R6API.default({ email, password })

    const user = await r6api.findByUsername(platform, username)

    if (!user) return;

    const userid = user[0].userId

    console.log(userid)

    const userRank = await r6api.getRanks(platform, userid)

    console.log(userRank)

    res.json({ user: user, rank: userRank })
})

app.get("/api/news", async (req, res) => {
    const r6api = new R6API.default({ undefined, undefined })

    let limit = req.query.limit

    const news = await r6api.getNews({ limit: limit })
    //{ locale: "pl_PL" }

    res.json({ news: news })
})

app.get("/api/individualNews", async (req, res) => {
    res.json(null)
})

// server start

app.listen(PORT, "0.0.0.0", () => {
    console.log(`api działa na 0.0.0.0:${PORT}`)
})