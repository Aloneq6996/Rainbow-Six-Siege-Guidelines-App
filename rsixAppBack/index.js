// imports

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const R6API = require("r6api.js")


// declarations 

const app = express();
const PORT = 6996;

// app

app.use(cors());
app.use(bodyParser.json());

// routes

app.get("/api/statistics", async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;
        const username = req.query.username;
        const platform = req.query.platform;

        const r6api = new R6API.default({ email, password });

        if (!r6api) {
            res.json("Invalid credentials provided");
            return;
        };

        const user = await r6api.findByUsername(platform, username);

        if (!user) {
            res.json("not work")
        };

        const userid = user[0].userId;

        // const rank = await r6api

        return res.json({ user: user, rank: rank })
    } catch (err) {
        console.error(err)
        return;
    }
})

app.get("/api/news", async (req, res) => {
    const r6api = new R6API.default({ undefined, undefined })

    let limit = req.query.limit

    const news = await r6api.getNews({ limit: limit })
    //{ locale: "pl_PL" }

    res.json({ news: news })
})

app.get("/api/individualNews", async (req, res) => {
    const newsId = req.query.id
    const r6api = new R6API.default({ undefined, undefined })

    const oneNews = await r6api.getNewsById(`${newsId}`)

    res.json(oneNews)
})

// server start

app.listen(PORT, "0.0.0.0", () => {
    console.log(`api działa na 0.0.0.0:${PORT}`)
})