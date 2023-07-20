const mongoose = require('mongoose')
const PokemonModel = require("../models/pokemon.js")
const auth = require("../auth/auth.js")

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5  //si plusieurs paramètres, n'a qu'a les récup 1 par 1

      if(name.length < 2) {
        const message = `Le terme de recherche : ${name} doit contenir au minimum 2 lettres.`
        return res.status(400).json({ message })
      }

      return PokemonModel.aggregate([
        {$match: { name: { $regex: new RegExp(name, 'i')} } },
        {$limit: limit},
        {$sort: { name: 1 } } //pas forcément obliger de les trier dans l'ordre, ils apparaîtront dans l'ordre du pokédex après la recherche
      ])
      .then(pokemons => {
        return PokemonModel.countDocuments({ name: { $regex: new RegExp(name, 'i')} })
          .then((totalCount) => {
            const message = `Il y a ${totalCount} pokémons qui correspondent au terme de recherche : ${name}.`
            res.json({ message, data: pokemons })
          })
          .catch (error => {
            const message = `Le nombre total de pokémons n'a pas pu être récupéré. Réessayer dans quelques instants.`
            res.status(500).json({ message, data: error })
          })
      })
      .catch (error => {
        const message = `La liste des pokémons filtrée n'a pas pu être récupérée. Réessayer dans quelques instants.`
        res.status(500).json({ message, data: error })
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