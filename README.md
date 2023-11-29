# Discord bot

i have no idea for naming this project

## Setup

Create [Supabase](https://supabase.com) project\
Create [discord application](https://discord.com/developers/applications)\
Setup discord provider on [Supabase](https://supabase.com), [Instructions here](https://supabase.com/docs/guides/auth/social-login/auth-discord)\
Open SQL Editor on [Supabase](https://supabase.com) and [Execute this](https://gist.github.com/fdvky1/1bf95e80e2155c228e1ba050aa29ff35)

Run [Backend](https://github.com/fdvky1/discord-bot) first

fill the .env
```bash
SUPABASE_URL="your supabase project url"
SUPABASE_KEY="supabase project anon key"
SERVICE_URL="BOT SERVICE URL(you must setup the backend)"
```
Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
