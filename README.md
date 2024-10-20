# Dynamic Impact Map Backend

The Dynamic Impact Map is an interactive visualization tool that showcases a Pastor's cumulative engagement across the United States. It displays the flow of engagement from the Pastor's headquarters to various states, providing a representation of their impact and reach.

## How to run the project

### Using Docker

1. Install Docker
2. Run `docker compose up`

### Locally

1. Point your `.env` file to the correct database credentials
2. Install dependencies and generate Prisma client with `npm install` or `yarn install`
3. Run `npm run prisma:reset` or `yarn prisma:reset` to reset the database and seed it with data
4. Run `npm run dev` or `yarn dev` to start the development server

## Scripts

- `npm run prisma:reset` or `yarn run prisma:reset` will reset the database and seed it with initial data
- `npm run engagements:generator` or `yarn run engagements:generator` will insert random engagements into the database every minute
- `npm run engagements:single` or `yarn run engagements:single` will insert a single engagement into the database, a second parameter can be provided to specify the state
