const mongoose = require('mongoose')
let pokemons = require('./mock-pokemon.js')
const PokemonModel = require("../models/pokemon.js")
const UserModel = require("../models/user.js")
const bcrypt = require('bcrypt')

let mongoDBURL
// 1ère connexion à MongoDB(production)
if(process.env.NODE_ENV === 'production') {
      mongoDBURL = 'mongodb://0.0.0.0:27017/test_database'
      mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      // 3. Tester la connexion
      .then(() => {
            console.log('Connexion au serveur MongoDB en production établie avec succès');
      })
      .catch((error) => {
            console.error('Erreur lors de la connexion à MongoDB:', error.message);
      })
} else {
      // 1ère Connexion à MongoDB(dev)
      // 1. URL
      mongoDBURL = 'mongodb://0.0.0.0:27017/test_database'
      // 2. Configuration et connexion à MongoDB
      mongoose.connect(mongoDBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      })
      // 3. Tester la connexion
      .then(() => {
            console.log('Connexion au serveur MongoDB en développement établie avec succès');
      })
      .catch((error) => {
            console.error('Erreur lors de la connexion à MongoDB:', error.message);
      })
}



// 1ère Synchronisation du Model    /   Faire les modif pour que ça insère qu'une fois les données la 1ère fois
// run()
async function run() {
	try {
		const pokemon = await PokemonModel.insertMany(pokemons)
            console.log(`${pokemons.name} créé dans la collection PokemonModel !`)
            console.log(pokemon)

            const match = await bcrypt.hash("pikachu", 10)
            const user = await UserModel.insertMany( {
                  username: "pikachu76",
                  password: match
            } )
            console.log(`${user.username} créé dans la collection PokemonModel !`)
            console.log(user)
	} catch(e) {
		console.log(`Erreur lors de l'insertion dans MongoDB:`, e.message) //errors.age....
	}
}

module.exports = run