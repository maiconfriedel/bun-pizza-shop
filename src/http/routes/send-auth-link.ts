import { createId } from '@paralleldrive/cuid2'
import Elysia, { t } from 'elysia'
import { db } from '../../db'
import { authLinks } from '../../db/schema'
import { env } from '../../env'

export const sendAuthLink = new Elysia().post(
  '/authenticate',
  async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })

    if (!userFromEmail) throw new Error('User not found')

    const authLinkCode = createId()

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code: authLinkCode,
    })

    // TODO: Send email with auth link

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    console.log('authLink', authLink.toString())

    return authLink.toString()
  },
  {
    body: t.Object({ email: t.String({ format: 'email' }) }),
    detail: { tags: ['Auth'] },
  },
)
