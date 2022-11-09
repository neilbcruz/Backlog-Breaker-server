const express = require('express');
const router = express.Router();
const fs = require("fs");
const gamesData = require('../data/games.json');
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

router
    .route('/:id')
    .get((req, res) => {
        const [selectedGame] = gamesData.filter(
            (game) => game.id === req.params.id
        );
        res.json(selectedGame)
    })
    .patch((req, res) => {
        const updatedGame = gamesData.findIndex((game) => game.id === req.params.id);

        fs.writeFile(
            './data/games.json',
            JSON.stringify(Object.assign([...gamesData], { [updatedGame]: req.body })),
            (err) => {
                if (!err) {
                    console.log('Updated status!')
                }
            }
        );
        console.log(req.body);
        res.sendStatus(200);
    })
    .delete((req, res) => {
        const gameExists = gamesData.find((game) => game.id === req.params.id);

        if (!gameExists) {
            res.status(404).send('Game does not exist!');
        } else {
            const updatedGamesData = gamesData.filter(
                (games) => games.id !== req.params.id
            );
            res.send(`Deleted game with ID ${req.params.id} `)
            fs.writeFileSync('./data/games.json', JSON.stringify(updatedGamesData));
        }
    })

module.exports = router;