
# ****Jitera Auction Site****

Disclaimer: Due to lack of time, reasonably amount of effort needed on this project and other prioritized matters. I decided to cut off some features. The app still works, but is not production-ready.

[Demo Link](https://jitera-auction-production.up.railway.app)

## Getting Started

You can use following command to run the app in development mode.

```
blitz dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL="DATABASE_URL"
# DATABASE_URL=DATABASE_URL
RESEND_API_KEY="<RESEND_API_KEY>"
APP_ORIGIN="DATABASE_URL"

```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/jitera-auction_test
```

## Tests

Runs your tests using Jest.

```
yarn test
```

The project was setup using [Vitest](https://vitest.dev/) and [react-testing-library](https://testing-library.com/).

## Commands

First, you need blitz cli installed. Install it with: `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export the app as a static application
  prisma    Run prisma commands
  generate  Generate new files for the project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## What's included?

Here is the overall project structure

```
jitera-auction
├── src/
│   ├── api/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── mutations/
│   │   │   ├── changePassword.ts
│   │   │   ├── forgotPassword.test.ts
│   │   │   ├── forgotPassword.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── resetPassword.test.ts
│   │   │   ├── resetPassword.ts
│   │   │   └── signup.ts
│   │   ├── pages/
│   │   │   ├── forgot-password.tsx
│   │   │   ├── login.tsx
│   │   │   ├── reset-password.tsx
│   │   │   └── signup.tsx
│   │   └── validations.ts
│   ├── core/
│   │   ├── components/
│   │   │   ├── Form.tsx
│   │   │   └── LabeledTextField.tsx
│   │   └── layouts/
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── 404.tsx
│   │   ├── index.test.tsx
│   │   └── index.tsx
│   └── users/
│       ├── hooks/
│       │   └── useCurrentUser.ts
│       └── queries/
│           └── getCurrentUser.ts
├── db/
│   ├── migrations/
│   ├── index.ts
│   ├── schema.prisma
│   └── seeds.ts
├── integrations/
├── mailers/
│   └── forgotPasswordMailer.ts
├── public/
│   ├── favicon.ico
│   └── logo.png
├── test/
│   ├── setup.ts
│   └── utils.tsx
├── .eslintrc.js
├── babel.config.js
├── blitz.config.ts
├── vitest.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── types.ts
```

These files are:

- The `src/` folder is a container for most of the project. This is where you’ll put any pages or API routes.

- `db/` is where database configuration goes. If you’re writing models or checking migrations, this is where to go.

- `public/` is a folder where you will put any static assets. If you have images, files, or videos which you want to use in your app, this is where to put them.

- `integrations/` is a folder to put all third-party integrations like with Stripe, Sentry, etc.

- `test/` is a folder where you can put test utilities and integration tests.

- `package.json` contains information about the dependencies and devDependencies. If you’re using a tool like `npm` or `yarn`, you won’t have to worry about this much.

- `tsconfig.json` is our recommended setup for TypeScript.

- `.babel.config.js`, `.eslintrc.js`, `.env`, etc. ("dotfiles") are configuration files for various bits of JavaScript tooling.

- `blitz.config.ts` is for advanced custom configuration of Blitz..

- `vitest.config.ts` contains config for Vitest tests.


### Tools used

- **NodeJS**, preferably 18 (LTS) and use [nodenv](https://github.com/nodenv/nodenv) to install.

- **BlitzJS** framework. It is built on top of NextJS and Prisma. Which means we don't have to worry about setting up API server and frontend deployment separately.

- **ESLint**: It lints code: searches for bad practices and tell you about it. You can customize it via the `.eslintrc.js`, and you can install (or even write) plugins to have it the way you like it. It already comes with the [`blitz`](https://github.com/blitz-js/blitz/tree/canary/packages/eslint-config) config, but you can remove it safely. [Learn More](https://blitzjs.com/docs/eslint-config).
- **Husky**: It adds [githooks](https://git-scm.com/docs/githooks), little pieces of code that get executed when certain Git events are triggerd. For example, `pre-commit` is triggered just before a commit is created. You can see the current hooks inside `.husky/`. If are having problems commiting and pushing, check out ther [troubleshooting](https://typicode.github.io/husky/#/?id=troubleshoot) guide. [Learn More](https://blitzjs.com/docs/husky-config).
- **Prettier**: It formats code to look the same everywhere. You can configure it via the `.prettierrc` file. The `.prettierignore` contains the files that should be ignored by Prettier; useful when you have large files or when you want to keep a custom formatting. [Learn More](https://blitzjs.com/docs/prettier-config).

### How I built it

As you can see, the app is not quite completed but the idea is to follow what [Yahoo Auction](https://auctions.yahoo.co.jp/) is doing. Basically, we need:

- An authentication system: The framework provide this to us and it is what I'm using in the project, basic password authentication with session token. But we can also use other tools like [Clerk](https://clerk.com/), [Kinde](https://kinde.com/)

- A mailer to send verification emails and password reset emails. I choose [Resend](https://resend.com/overview) over other choices (Postmark might be an alternative) since it's friendly for developers.

- A CronJob / Queue module: This comes with [Squirrel](https://docs.quirrel.dev/), which supports Blitz but is deployed separately (executed codes are still in this repository). It is a cronjob runner with Redis as the engine for Queue provider.

- A UI toolkit for faster development, for that I chose [Mantine](https://mantine.dev/) as it provides many components, written in Typescript and comes with many utility hooks. It has responsive layout by default and supports NextJS 13 as well.

- Vitest for unit testing and Cypress for e2e testing.

## About testing

The project uses Vitest for unit testing, in conjunction with `@testing-library/react`. For e2e testing, Cypress is intended to be used (but not... yet). Those two can be integrated in regular CI/CD pipelines.

## About frontend side

The framework itself is built on top of NextJS and `react-query`, so it's the actual frontend powerhouse. For UI kit, [Mantine](https://mantine.dev/) is used. For client-side state management, [zustand](https://github.com/pmndrs/zustand) will be used.

## About the database schema and ORM

The framework includes Prisma and it's the ORM for the app. Following tables are included in the schema:

- **User**: The user table, with `balance` as extra field to store user's fake money temporarily.
- **UserAuctionHistory**: To store user's bidding history, mostly create/update/delete events.
- **Auction**: The main auction entity. Can be created by logged in users. User who created it cannot place a bid on it.
- **UserAuction**: The linking table between *User* and *Auction* tables. 1 user can have only one UserAuction entry on 1 auction.

## How does it work?

There are several cases we need to cover. To be honest I couldn't implemented them all, but I can foresee:

- For one auction, there are 4 cases (assuming you are not the one who host the auction):
  - Nobody placed a bid yet.
  - You placed a bid, and no higher bidder yet.
  - You placed a bid, and there is at least one higher bidder.
  - You haven't placed a bid yet, and there is at least one higher bidder.
- Ideally, the auction SHOULD extend at least for extra 5 minutes if there are still bids *before* the auction ends (which is what Yahoo Auction is doing too). So we need a cronjob to check and return money to the bidders who didn't pay the highest price.
- There can be no start time, because in such situation, start time is when the auction is created. However:
  - The end time should be at least ONE day after start time.
  - The start time can't be in the past.
  - The end time shouldn't be too long, 5 to 7 days would be optimal.
- Price step and currency should be existed.
