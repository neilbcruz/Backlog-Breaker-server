const express = require('express');
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
// const knex = require("knex")(require("../knexfile"));
// require("dotenv").config();
const gamesData = require('../data/games.json');
const games = fs.readFileSync('./data/games.json');

router
    .route('/')
    .get((req, res) => {
        const gamesJson = JSON.parse(games);
        const gamesList = gamesJson.map
        (({ id, name, background_image, status, description, description_raw, website, metacritic_url, esrb_rating, reddit_url, released, rating, genres, platforms }) => 
        ({ id, name, background_image, status, description, description_raw, website, metacritic_url, esrb_rating, reddit_url, released, rating, genres, platforms }));

        res.send(gamesList);
    })
    .post((req, res) => {
        const { id } = req.body;
        const newGame = { ...req.body, id };
        // console.log(id)

        const gamesJson = JSON.parse(games);

        const gamesData = [...gamesJson, newGame];

        fs.writeFileSync('./data/games.json', JSON.stringify(gamesData));
        console.log(req.body)
        res.status(201).send({ status: "posted" });
    })
    .put((req, res) => {
        const updatedGame = gamesData.findIndex((info) => info.id === req.params.id);

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

// router
//     .route('/:id')
//     .get((req, res) => {
//         const game = JSON.parse(games).find(({ id }) => id === req.params.id);
//         console.log(game)
//         res.send(game);
        
//         const [selectedGame] = gamesData.filter(
//             (game) => game.id === req.params.id
//         );
//         res.json(selectedGame)
        
//         const gameData = JSON.parse(games);
//         const filteredGame = gameData.filter((game) => game.id === req.params.id);
//         res.json({
//             game: filteredGame
//         })
//     })
//     .put((req, res) => {
//         const updatedGame = gamesData.findIndex((game) => game.id === req.params.id);

//         fs.writeFile(
//             './data/games.json',
//             JSON.stringify(Object.assign([...gamesData], { [updatedGame]: req.body })),
//             (err) => {
//                 if (!err) {
//                     console.log('Updated status!')
//                 }
//             }
//         );
//         console.log(req.body);
//         res.sendStatus(200);
//     })
//     .delete((req, res) => {
//         const gameExists = gamesData.find((game) => game.id === req.params.id);

//         if (!gameExists) {
//             res.status(404).send('Game does not exist!');
//         } else {
//             const updatedGamesData = gamesData.filter(
//                 (games) => games.id !== req.params.id
//             );
//             res.send(`Deleted game with ID ${req.params.id} `)
//             fs.writeFileSync('./data/games.json', JSON.stringify(updatedGamesData));
//         }
//     })

module.exports = router;