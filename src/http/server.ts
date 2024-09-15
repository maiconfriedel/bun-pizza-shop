import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getProfile } from './routes/get-profile'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { signOut } from './routes/sign-out'

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Pizza Shop API',
          version: '1.0.0',
          description: 'API for Pizza Shop using Elysia',
          contact: {
            email: 'maicon.friedel@gmail.com',
          },
        },
        tags: [
          { name: 'Restaurant', description: 'Operations about restaurants' },
          { name: 'Auth', description: 'Operations about authentication' },
        ],
      },
    }),
  )
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)

app.listen(3333, () => {
  console.log('HTTP Server running')
})
