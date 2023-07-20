const mongoose = require('mongoose')
const validator = require('validator')
const validTypes = ["Plante","Poison", "Feu", "Eau", "Fée", "Electrik", "Insecte", "Vol", "Normal"]

const pokemonSchema = new mongoose.Schema({
	id: {
        type: Number,
    },
	name: {
		type: String,
		required: [true, 'Le nom est une propriété requise.'],
		unique: true,	//la liste s'intègre 2 fois dans la db -> et comme le unique : true alors fonctionne pas et renvoie error / gérer le message d'error qui prend le 500 par défaut -> trouver ConstraintError
		trim: true,
    },
	hp: {
		type: Number,
		required: [true, 'Les hp sont une propriété requise.'],
		min: [1, 'Les hp ne peuvent pas être inférieur à 1'],
		max: [999, 'Les hp ne peuvent pas être supérieur à 999'],
	},
    cp: {
		type: Number,
		required: [true, 'Les cp sont une propriété requise.'],
		min: [1, 'Les cp ne peuvent pas être inférieur à 1'],
		max: [999, 'Les cp ne peuvent pas être supérieur à 999'],
	},
    picture: {
		type: String,
		required: [true, "L'image est une propriété requise."],
		trim: true,
		validate: {
			validator: function (value) {
				return validator.isURL(value);
			},
			message: props => `Utilisez uniquement une URL pour l'image et pas ${props.value}.`
		}
	},
    types: {
		type: [String],	//pas besoin de get et setter
		required: [true, "L'image est une propriété requise."],
		trim: true,
		validate: {
			validator: function (value) {
				if(!value) {
					throw new Error('Un pokémon doit au moins avoir 1 type.')
				} else if(value.length > 3) {
					throw new Error('Un pokémon ne peut pas avoir plus de 3 type.')
				}
				value.forEach(type => {
					if(!validTypes.includes(type)) {
						throw new Error('Le type du pokémon doit exister.')
					}
				});
			},
		},
	},
    createdAt: {
		type: Date,
		immutable: true,  //pas modifiable
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
})

module.exports = mongoose.model("PokemonModel", pokemonSchema)




// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define('Pokemon', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       hp: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       cp: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//       },
//       picture: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       types: {
//         type: DataTypes.STRING,
//         allowNull: false
//       }
//     }, {
//       timestamps: true, //modif comportement par dft
//       createdAt: 'created',
//       updatedAt: false
//     })
//   }