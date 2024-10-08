/* eslint-disable drizzle/enforce-delete-with-where */
import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { db } from './'
import { restaurants, users } from './schema'

console.log(chalk.blueBright('Starting database seed'))

await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellowBright('Database reset!'))

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer',
  },
])

console.log(chalk.yellowBright('Created customers!'))

const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: 'admin@admin.com',
      role: 'manager',
    },
  ])
  .returning({ id: users.id })

console.log(chalk.yellowBright('Created manager!'))

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id,
  },
])

console.log(chalk.yellowBright('Created restaurant!'))

console.log(chalk.greenBright('Database seed completed sucessfully!'))

process.exit(0)
