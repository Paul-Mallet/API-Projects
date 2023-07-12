/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
export async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
        return { hello: 'hello world ❤️' }
      })
}