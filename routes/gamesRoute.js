const express = require('express');
const router = express.Router();
const fs = require("fs");
const games = fs.readFileSync('./data/games.json');

router
    .route('/')
    .get((_req, res) => {
        const gamesJson = JSON.parse(games);
        const gamesList = gamesJson.map
            (({ id, name, background_image, status, description, description_raw, website, metacritic_url, esrb_rating, reddit_url, released, rating, genres, platforms }) =>
                ({ id, name, background_image, status, description, description_raw, website, metacritic_url, esrb_rating, reddit_url, released, rating, genres, platforms }));

        res.send(gamesList);
    })
    .post((req, res) => {
        const { id } = req.body;
        const newGame = { ...req.body, id };

        const gamesJson = JSON.parse(games);

        const gamesData = [...gamesJson, newGame];

        fs.writeFileSync('./data/games.json', JSON.stringify(gamesData));
        res.status(201).send({ status: "posted" });
    })

module.exports = router;