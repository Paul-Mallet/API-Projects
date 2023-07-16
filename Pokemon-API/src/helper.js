// export const success = (message, data) => {
//     return { message, data }
// }

// export const getUniqueId = (pokemons) => {
//     const pokemonsIds = pokemons.map(pokemon => pokemon.id) //retourne un tab avec les id des pokemons
//     const maxId = pokemonsIds.reduce((a,b) => Math.max(a,b))  //récup l'id le plus grand(le dernier)
//     const uniqueId = maxId + 1  //lui ajoute 1
//     return uniqueId
// }



exports.success = (message, data) => {
    return { message, data }
  }

exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId = pokemonsIds.reduce((a,b) => Math.max(a, b))
    const uniqueId = maxId + 1

    return uniqueId
}

// c'est la database qui attribut un id unique, là c'est manuellement

// CommonJS
// exports.success = (message, data) => {
//     return { message, data }
// }
// exports.success -> const success =... + exports.success
// message -> message : message
// la res renverra un obj qui englobera en 1er le message, puis la data du pokemon demandé