// imports

const express = require("express");
const cors = require("cors");
const fs = require("fs").promises
const bodyParser = require("body-parser")
const R6API = require("r6api.js")


// declarations 

const app = express();
const PORT = 6969;
const SETTINGS_FILE_PATH = "./assets/settings.json";

// app

app.use(cors());
app.use(bodyParser.json());

// routes

app.post("/api/saveSettings", async (req, res) => {
    const { email, password } = req.body;
    const settings = { email, password };
    try {
        await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(settings, null, 2));
        res.json({ message: "Settings saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save settings" });
    }
});

app.get("/api/loadSettings", async (req, res) => {
    try {
        const data = await fs.readFile(SETTINGS_FILE_PATH, "utf-8");
        const settings = JSON.parse(data);
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: "Failed to load settings" });
    }
});

app.post("/api/removeSettings", async (req, res) => {
    try {
        await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(null, null, 2));
        res.json({ message: "Settings removed successfully!" })
    } catch (error) {
        res.status(500).json({ error: "Failed to remove settings" });
    }
})

// server start

app.listen(PORT, "0.0.0.0", () => {
    console.log(`api działa na 0.0.0.0:${PORT}`)
})