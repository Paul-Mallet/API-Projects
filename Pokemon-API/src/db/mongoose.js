const mongoose = require('mongoose')
let pokemons = require('./mock-pokemon.js')
const PokemonModel = require("../models/pokemon.js")

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
})
.catch((error) => {
      console.error('Erreur lors de la connexion à MongoDB:', error.message);
})

// 1ère Synchronisation du Model
run()
async function run() {
	try {
			const pokemon = await PokemonModel.insertMany(pokemons)
            console.log(`${pokemon.name} créé dans la collection PokemonModel !`)
            console.log(pokemon)
	} catch(e) {
		console.log(e.message) //errors.age...
	}
}

module.exports = run