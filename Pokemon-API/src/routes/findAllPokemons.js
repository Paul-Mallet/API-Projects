const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      return PokemonModel.aggregate([
        {$match: { name: { $regex: name } } },
        {$limit: 5}
      ]) //mettre countDocument en dehors de aggregate et le placer dans le message d'erreur(voir si limit à un impact cu qu'il est avt)
      .then(pokemons => {
        const message = `Il y a ${pokemons.length} pokémons qui correspondent au terme de recherche : ${name}.`
        res.json({ message, data: pokemons })
      })
    } else {
      PokemonModel.find()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch (error => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}