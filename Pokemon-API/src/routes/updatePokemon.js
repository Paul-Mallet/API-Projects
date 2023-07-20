const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")
const auth = require("../auth/auth.js")

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    PokemonModel.findOneAndUpdate({_id: id}, req.body, { new: true, runValidators: true })
      .then((pokemon) => {
        if (pokemon === null) {
          return res.status(404).json({ message: `Le pokémon demandé n'existe pas. Essayer avec un autre identifiant.` })
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({ message, data: pokemon })
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ message: error.message, data: error }) //affiche toutes les erreurs
        } else if (error.code === 11000) {
          const message = `Ce pokémon existe déjà dans la liste. Réessayer avec un autre nom.`
          return res.status(400).json({ message, data: error }) //affiche toutes les erreurs
        }
        const message = `Le pokémon n'a pas pu être modifié. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}