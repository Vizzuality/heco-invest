# HeCO backend

## Dependencies:

- Ruby v3.1
- Rails v7
- PostgreSQL v14

## Local installation

These are the steps to run the project locally:

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

### Run linters

`bin/rails standard`

To fix linter issues

`bin/rails standard:fix`
