const mongoose = require('mongoose')
const UserModel = require('../models/user.js')
const bcrypt = require('bcrypt')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    UserModel.findOne({username: req.body.username})
        .then(user => {

            if (!user) {
                const message = `L'utilisateur demandé n'existe pas.`;
                return res.status(404).json({ message, data: user })
            }

            bcrypt.compare(req.body.password, user.password)
                .then(isPasswordValid => {

                    if(!isPasswordValid) {
                        const message = `Le mot de passe est incorrect.`;
                        return res.status(401).json({ message })
                    }

                    const message = `L'utilisateur a été connecté avec succès.`;
                    return res.json({ message, data: user })
                })
        })
        .catch (error => {
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error })
        })
  })
}