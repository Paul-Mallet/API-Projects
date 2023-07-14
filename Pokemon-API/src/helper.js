export const success = (message, data) => {
    return { message, data }
}

// CommonJS
// exports.success = (message, data) => {
//     return { message, data }
// }
// exports.success -> const success =... + exports.success
// message -> message : message
// la res renverra un obj qui englobera en 1er le message, puis la data du pokemon demandé