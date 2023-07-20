const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")
const auth = require("../auth/auth.js")

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    PokemonModel.create(req.body)   //create pour créer un nv doc, insertOne() pour insérer un déjà existant !
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été créé.`
        res.json({ message, data: pokemon })
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: error.message, data: error }) //affiche toutes les erreurs
        } else if (error.code === 11000) {
          const message = `Ce pokémon existe déjà dans la liste. Réessayer avec un autre nom.`
          return res.status(400).json({ message, data: error }) //affiche toutes les erreurs
        }
        const message = `Le pokémon n'a pas pu être créé. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}
// pauma\Desktop\Full-Stack\Exercises\JS\Back-End\Node.js\Simon\API-Projects\Pokemon-API