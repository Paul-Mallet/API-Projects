import Fastify from 'fastify'

const fastify = Fastify({
  logger: false //see server infos
})

fastify.get('/', async (request, reply) => {
  return { hello: 'hello world ❤️' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()