# HeCO backend

## Dependencies:

- Ruby v3.1
- Bundler v2.3.3
- PostgreSQL v14 with postgis extension

Development dependency: redis-server

## Local installation

These are the steps to run the project locally:

The root directory of the backend application is in heco-invest/backend.

You will need to create an .env file in the project root with values of environment variables required by the application. See ENV VARS documented in ENV_VARS.md

For documentation of server deployment, please refer to [the infrastructure documentation](../infrastructure/README.md).

### Installing ruby dependencies

In the root directory run `bundle install`.

### Database

You can use `docker-compose.yml` to run postgres service.

`docker-compose up -d`

#### Create database schema

`bin/rails db:setup` to setup the database

### Run the server

`bin/dev` and access the project on `http://localhost:4000`

If you want to debug the Rails app, running it through foreman could be not the best idea. In that case you can run css and js bundling
using foreman `bin/watch` and the server in the standard way `bin/rails server` in a separate terminal tab.

See the generated api docs (described below) for available API endpoints. The backoffice is accessed at `/backoffice`. All route paths are prefixed with the value of the `RAILS_RELATIVE_URL_ROOT` env var. For example, if `RAILS_RELATIVE_URL_ROOT=backend`, then all the API endpoints and backoffice urls will be prefixed e.g. `/backend/backoffice`.

### Run background jobs

We use `cloudtasker` gem to schedule ad-hoc background jobs. In development, you need `redis-server` running and a `cloudtasker` process.

### Run the tests

`bundle exec rspec`

### Run rswag to generate API documentation

`SWAGGER_DRY_RUN=0 rake rswag:specs:swaggerize`

Documentation can be found at `/api-docs`.

### Replace snapshot files

On the first run, the `match_snapshot` matcher will always return success and it will store a snapshot file. On the next runs, it will compare the response with the file content.

If you need to replace snapshots, run the specs with:

`REPLACE_SNAPSHOTS=true bundle exec rspec`

If you only need to add, remove or replace data without replacing the whole snapshot:

`CONSERVATIVE_UPDATE_SNAPSHOTS=true bundle exec rspec`

### Run linters

`bin/rails standard`

To fix linter issues

`bin/rails standard:fix`

### Translations

We use Transifex to provide the best UX for translators. The system is set up to use Zulu (zu) as the main language. This is a trick to enable translators to also update English translations (read more [here](https://github.com/Vizzuality/heco-invest/tree/develop/frontend#translations)).

Static content that needs to be translated has to be added only to `config/locales/zu.yml` file. To push new translations to Transifex use `tx push -s`.

To download already translated content `bin/rails transifex:pull`
