# HeCo Invest - Front-end

The front-end application of the HeCo Invest platform is built upon [Vizzuality's scaffold project](https://github.com/Vizzuality/front-end-scaffold) and use the following resources:

- [React](https://reactjs.org/) as a UI library
- [Next.js](https://nextjs.org/) as a framework
- [Tailwind CSS](https://tailwindcss.com/) as a styles framework
- [Storybook](https://storybook.js.org/) as a sandbox for the UI components
- [React Aria](https://react-spectrum.adobe.com/react-aria/index.html) to facilitate the application's accessibility
- [Rooks](https://react-hooks.org/) to provide reusable React hooks
- [React Query](https://react-query.tanstack.com/) as a network layer
- [Feather](https://feathericons.com/) as a icon provider

The application's design files can be found here:

- [Design system](https://www.figma.com/file/3epSYh4KQZBCyh4Y5OzmHw/HeCo---Design-System?node-id=2345%3A4760)
- [Main file](https://www.figma.com/file/KC49uMR9t1YARmFR0Sr6aN/HeCo---Work-in-progress?node-id=0%3A1)

## Quick start

In order to start modifying the app, please make sure to correctly configure your workstation:

1. Make sure you you have [Node.js](https://nodejs.org/en/) installed
2. (Optional) Install [NVM](https://github.com/nvm-sh/nvm) to manage your different Node.js versions
3. (Optional) Use [Visual Studio Code](https://code.visualstudio.com/) as a text editor to benefit from automatic type checking
4. Configure your text editor with the [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [EditorConfig](https://editorconfig.org/), [Tailwind CSS](https://tailwindcss.com/docs/plugins) (recommended) and [Headwind](https://github.com/heybourn/headwind) (recommended) plugins
5. (Optional) Configure your editor to “format [code] on save” with ESLint and Prettier **(1)**
6. Use the correct Node.js version for this app by running `nvm use`; if you didn't install NVM (step 2), then manually install the Node.js version described in `.nvmrc`
7. Install the dependencies: `yarn`
8. Create a `.env` file at the root of the project by copying `.env.sample` and giving a value for each of the variables (see next section for details)
9. Run the server: `yarn dev`

You can access a hot-reloaded version of the app on [http://localhost:3000](http://localhost:3000).

**(1)** The package `react-intl` used for translations (see below) requires ids for each source string. ESLint is configured to report an error if missing. With the “format on save” feature on, the ids are automatically generated for you when you save the document.

## Environment variables

The application (and API) is configured via environment variables stored in a `.env` file that must be placed at the root of the project. You can create one by copying `.env.sample` and setting a value for each key.

Below is a description of each of the keys.

| Variable                          | Description                                                                                                                                  |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| NEXT_PUBLIC_FRONTEND_URL          | Complete URL from which the front-end application is served (including https) and without a trailing slash (e.g. https://vizzuality.com)     |
| NEXT_PUBLIC_BACKEND_URL           | Complete URL from which the back-end application is served (including https) and without a trailing slash (e.g. https://vizzuality.com)      |
| NEXT_PUBLIC_PROXY_BACKEND         | Indicates whether the back-end application is proxied through the front-end application                                                      |
| NEXT_PUBLIC_GOOGLE_MAPS_API_KEY   | Key for Google Maps - Places API                                                                                                             |
| NEXT_PUBLIC_MAPBOX_API_TOKEN      | Mapbox's account API access token                                                                                                            |
| NEXT_PUBLIC_GOOGLE_ANALYTICS      | Optional − Google Analytics' measurement ID (Google Tag Manager)                                                                             |
| NEXT_PUBLIC_HOTJAR_SITE_ID        | Optional − Hotjar's site ID                                                                                                                  |
| NEXT_PUBLIC_USER_TESTING_FORM_URL | Optional − URL of an external form to recruit for user testing                                                                               |
| HTTP_AUTH_USERNAME                | Optional − Platform access restriction − Username (HTTP_AUTH_PASSWORD, NEXTAUTH_SECRET and NEXTAUTH_URL required)                            |
| HTTP_AUTH_PASSWORD                | Optional − Platform access restriction − Password (HTTP_AUTH_USERNAME, NEXTAUTH_SECRET and NEXTAUTH_URL required)                            |
| NEXTAUTH_SECRET                   | Optional − Platform access restriction − Key to encrypt the JWT (HTTP_AUTH_USERNAME, HTTP_AUTH_PASSWORD and NEXTAUTH_URL required)           |
| NEXTAUTH_URL                      | Optional − Platform access restriction − Same as NEXT_PUBLIC_FRONTEND_URL (HTTP_AUTH_USERNAME, HTTP_AUTH_PASSWORD and NEXTAUTH_URL required) |

## CI/CD

When a pull request (PR) is created, a GitHub action runs the tests (`yarn test`) and then deploys the application to a development environment on Vercel. A comment will be automatically added to the PR with the link to the environment.

When the PR is merged or commits are directly pushed to the `develop` branch (not recommended), the tests are also run, translations are downloaded (more on that below), and the application is deployed to the staging environment: https://heco-invest-frontend.vercel.app/.

When a PR is merged to the `main` branch, the same process is also executed and the application is deployed to the production environment: TBD.

It is recommended to mention the Jira task ID either in commits or the branch names so that the deployment information can be directly available in Jira.

## Translations

[Transifex](https://www.transifex.com/) is the translation vendor that not only stores the translations, but also allows translators to input translations directly from its interface.

The application is set up so that the source language is understood as being Zulu (zu). Doing so, the source strings can not only be translated to Spanish and Portuguese, but their English version (the source) can also be modified.

The source and translated strings are located in the `/lang` folder:

- `lang/transifex/zu.json` contains the list of source strings extracted from the code
- `lang/transifex/*.json` contains the list of translated strings coming from Transifex (always empty)
- `lang/compiled/*.json` contains the list of strings that will be shown in the application (always empty)

The strings are extracted from the code and displayed in the production build by the [FormatJS](https://formatjs.io/) library, which contains the [react-intl](https://formatjs.io/docs/getting-started/installation) package that is used in React.

### Pipeline

Here is a step-by-step explanation of how the strings are translated and displayed:

1. New strings are added to the application using the `react-intl` hooks or components
2. When a commit is created, the pre-commit hook (see `../lefthook.yml`) executes a command that extracts them in the `lang/transifex/zu.json` file
3. When the code is merged to the `develop` branch, a staging deployment is triggered via a GitHub action:
   1. The extracted strings are pushed to Transifex
   2. The translations are pulled: the `lang/transifex/*.json` files are updated (not saved in repository)
   3. The translations are compiled: the `lang/compiled/*.json` files are updated (not saved in repository)
   4. The application is built with the compiled strings and deployed
4. When the `develop` branch is merged in `main`, the same previous step is repeated, except strings are not pushed to Transifex

This pipeline enables the translations to be server-side rendered (SSR-ed) and so it improves the SEO of the application.

## Contribution rules

Please, **create a PR** for any improvement or feature you want to add. Use the `develop` branch for this.

## Vulnerability mitigation

[Dependabot's vulnerability security alerts](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts) are configured in this repository and are displayed to the administrators.

When vulnerabilities are detected, a warning message is displayed at the top of the repository. The list of alerts can be found in the [Dependabot alerts page](https://github.com/Vizzuality/heco-invest/security/dependabot).

Here's a step by step guide on how to address vulnerabilities found in production code:

1. Go to the [Dependabot alerts page](https://github.com/Vizzuality/heco-invest/security/dependabot) and locate the front-end vulnerability to address
2. Identify if the vulnerability affects production code:
   - To do so run `yarn npm audit --recursive --environment production`
   - If the dependency is _not_ listed by this command, then the vulnerability only affects development code. You can dismiss the alert on GitHub as “Vulnerable code is not actually used” in the top right corner of the vulnerability page.
   - If the dependency _is_ listed, follow the steps below.
3. On the vulnerability page, click the “Create Dependabot security update” button
   - This will create a Pull Request with a fix for the vulnerability. If GitHub can generate this PR, then you can merge and the security alert will disappear.
   - If the vulnerability can't be patched automatically, follow the steps below.
4. If the action fails, then you can semi-automatically update the vulnerable dependency by running `npm_config_yes=true npx yarn-audit-fix --only prod`
   - `yarn-audit-fix` (see [repository](https://github.com/antongolub/yarn-audit-fix)) is a tool that applies the fixes from `npm audit fix` to Yarn installations
   - The tool might also not be able to fix the vulnerability. If so, continue with the steps below.
5. If the action fails, then you will have to manually update the dependencies until the vulnerability is solved
