import express from "express"
import morgan from "morgan"
import favicon from "serve-favicon"
import { success } from "./helper.js"
import { pokemons, getUniqueId } from "./mock-pokemon.js"

// CommonJS
// const express = require('express')
// const { success } = require('./helper.js')  // {} : affectation destructurée
// let pokemons = require('./mock-pokemon.js')

const app = express()
const port = 3000

// 1er middleware, peut le raccourcir
const logger = (req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
}

app.use(logger)
// morgan(terminal)
app
    // .use(favicon(__dirname + '/favicon.ico'))   //doit changer __dirname avec url(voir Grafikart)
    .use(morgan('dev'))

// route de base pour savoir si API rest est bien démarrée
app.get('/', function (req, res) {
  res.send('Hello World ! 😍')
})

// 1ere route qui renvoie 1 pokemon précis(id)
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokemon à bien été trouvé'
    res.json(success(message, pokemon))
})

// autre route qui renvoie toutes les données
app.get('/api/pokemons', (req, res) => {
    const pokemonsList = pokemons   // peut raccourcir
    const message = 'Voici la liste de tous les pokémons !'
    res.json(success(message, pokemonsList))
    // res.send(`Il y a  ${pokemons.length} pokémons dans le pokédex, pour le moment. 👌`)
})

// 1er ajout(API Rest) d'1 pokemon
app.post('api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été ajouté.`
    res.json(success(message, pokemonCreated))
})


app.listen(port, () => console.log(`Notre app Node est démarrée sur : http://localhost:${port}`))