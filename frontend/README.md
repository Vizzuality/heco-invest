# HeCo Invest - Front-end

The front-end application of the HeCo Invest platform is built upon [Vizzuality's scaffold project](https://github.com/Vizzuality/front-end-scaffold).

## Quick start

In order to start modifying the app, please make sure to correctly configure your workstation:

1. Make sure you you have [Node.js](https://nodejs.org/en/) installed
2. (Optional) Install [NVM](https://github.com/nvm-sh/nvm) to manage your different Node.js versions
3. (Optional) Use [Visual Studio Code](https://code.visualstudio.com/) as a text editor to benefit from automatic type checking
4. Configure your text editor with the [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [EditorConfig](https://editorconfig.org/) plugins
5. Use the correct Node.js version for this app by running `nvm use`; if you didn't install NVM (step 2), then manually install the Node.js version described in `.nvmrc`
6. Install the dependencies: `yarn`
7. Create a `.env` file at the root of the project by copying `.env.sample` and giving a value for each of the variables (see next section for details)
8. Run the server: `yarn dev`

You can access a hot-reloaded version of the app on [http://localhost:3000](http://localhost:3000).

The application is built using [React](https://reactjs.org/) and the framework [Next.js](https://nextjs.org/). The styles use the [Tailwind CSS](https://tailwindcss.com/) framework.

## Environment variables

The application (and API) is configured via environment variables stored in a `.env` file that must be placed at the root of the project. You can create one by copying `.env.sample` and setting a value for each key.

Below is a description of each of the keys.

| Variable | Description |
|---|---|
| NEXT_PUBLIC_API_URL | URL of the API supporting the platform |
| NEXTAUTH_URL | URL of the service managing the authentication |
| NEXT_PUBLIC_GOOGLE_ANALYTICS | Key of the Google Analytics account |
| NEXT_PUBLIC_TRANSIFEX_API_KEY | Key of the Transifex account |

## Contribution rules

Please, **create a PR** for any improvement or feature you want to add. Use the `develop` branch for this.
