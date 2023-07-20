const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    PokemonModel.findByIdAndDelete(id, req.body, { new: true })
      .then((pokemon) => {
        if (pokemon === null) {
          return res.status(404).json({ message: `Le pokémon demandé n'existe pas. Essayer avec un autre identifiant.` })
        }
        const message = `Le pokémon avec l'identifiant n°${pokemon._id} a bien été supprimé.`
        res.json({ message, data: pokemon })
      })
      .catch((error) => {
        // console.error('Erreur lors de la mise à jour du Pokémon :', error)
        const message = `Le pokémon n'a pas pu être supprimé. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
  })
}