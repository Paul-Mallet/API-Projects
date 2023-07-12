import Fastify from 'fastify'
import { routes as firstRoute } from './our-first-route.js'

const fastify = Fastify({
  logger: false //see server infos
})

// Declare a route  / import route
fastify.register(firstRoute)  //register() : API qui permet d'add plugins, routes...

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 8000, host: '127.0.0.1' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()