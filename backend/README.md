# HeCO backend

## Dependencies:

- Ruby v3.1
- Bundler v2.3.3
- PostgreSQL v14

## Local installation

These are the steps to run the project locally:

See ENV VARS documented in ENV_VARS.md

### Installing ruby dependencies

On the project's root run `bundle install`.

### Database

You can use `docker-compose.yml` to run postgres service.

`docker-compose up -d`

#### Create database schema

`bin/rails db:setup` to setup the database

### Run the server

`bin/dev` and access the project on `http://localhost:4000`

If you want to debug rails app, running it through foreman could be not the best idea. In that case you can run css and js bundling
using foreman `bin/watch` and the server in the standard way in a separate terminal tab.

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

TODO: When adding docker, make sure fresh translations are pulled when creating the image in Dockerfile.

Static content that needs to be translated has to be added only to `config/locales/zu.yml` file. To push new translations to Transifex use `tx push -s`.

From time to time it will be useful to download already translated content into the repo `tx pull -m onlytranslated`.
