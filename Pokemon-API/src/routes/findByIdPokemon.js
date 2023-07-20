const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    PokemonModel.findById(req.params.id)
      .then(pokemon => {
        if (pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Essayer avec un autre identifiant.`
          return res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch (error => {
        const message = `Le pokémon n'a pas été trouvé. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}