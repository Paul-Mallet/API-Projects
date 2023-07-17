const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
	id: {
        type: Number,
    },
	name: {
		type: String,
		required: true,
    },
	hp: {
		type: Number,
		required: true,
	},
    cp: {
		type: Number,
		required: true,
	},
    picture: {
		type: String,
		required: true,
	},
    types: {
		type: [String],
		required: true,
	},
    createdAt: {
		type: Date,
		immutable: true,  //pas modifiable
		default: () => Date.now(),
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	}
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