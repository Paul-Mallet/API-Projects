// ES6 (problème export let pokemons)
// import express from "express"
// import morgan from "morgan"
// import bodyParser from "body-parser"
// import favicon from "serve-favicon"
// import { success, getUniqueId } from "./helper.js"
// import { pokemons } from "./mock-pokemon.js"


// CommonJS
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { success, getUniqueId } = require('./helper.js')  // {} : affectation destructurée
let pokemons = require('./mock-pokemon.js')
const PokemonModel = require("./models/pokemon.js")

const app = express()
const port = 3000

// 1ère Connexion à MongoDB
// 1. URL
const mongoDBURL = 'mongodb://0.0.0.0:27017/test_database'
// 2. Configuration et connexion à MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
// 3. Tester la connexion
.then(() => {
      console.log('Connexion au serveur MongoDB établie avec succès');
      // Vous pouvez commencer à interagir avec la base de données ici
})
.catch((error) => {
      console.error('Erreur lors de la connexion à MongoDB:', error.message);
})

// 1ère Synchronisation du Model
run()
async function run() {
	try {
			const pokemon = await PokemonModel.create({
                name: "Bulbizarre",
                hp: 25,
                cp: 5,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
                types: ["Plante", "Poison"]
            })
            console.log(`${pokemon.name} créé dans la collection PokemonModel !`)
            console.log(pokemon)
	} catch(e) {
		console.log(e.message) //errors.age...
	}
} 


// 1er middleware, peut le raccourcir
const logger = (req, res, next) => {
    console.log(`URL : ${req.url}`)
    next()
}

app.use(logger)

app
    // .use(favicon(__dirname + '/favicon.ico'))   //doit changer __dirname avec url(voir Grafikart)
    .use(morgan('dev'))
    .use(bodyParser.json()) //applique le middleware(parse) à tous les json

// route de base pour savoir si API rest est bien démarrée
app.get('/', function (req, res) {
  res.send('Hello World ! 😍')
})

// 1er endpoint(route) qui renvoie 1 pokemon précis(id)
app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokemon à bien été trouvé'
    res.json(success(message, pokemon))
})

// autre endpoint qui renvoie toutes les données
app.get('/api/pokemons', (req, res) => {
    const pokemonsList = pokemons   // peut raccourcir
    const message = 'Voici la liste de tous les pokémons !'
    res.json(success(message, pokemonsList))
    // res.send(`Il y a  ${pokemons.length} pokémons dans le pokédex, pour le moment. 👌`)
})

// 1er endpoint POST (API Rest) d'1 pokemon, doit encore le tester
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été ajouté.`
    res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   })

app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre app Node est démarrée sur : http://localhost:${port}`))