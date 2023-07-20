const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
	id: {
        type: Number,
    },
	username: {
		type: String,
		required: [true, 'Le nom est une propriété requise.'],
		unique: true,
		trim: true,
    },
	password: {
		type: String,
		required: [true, 'Le mot de passe est une propriété requise.'],
		trim: true,
	}
})

module.exports = mongoose.model("UserModel", userSchema)

// mongodb ajoute auto created et updated donc pas besoin de les ajouter ici