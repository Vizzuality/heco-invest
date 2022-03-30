#!/bin/bash
set -e

case "$1" in
    start)
        echo "Pulling translations from transifex"
        ./tx pull -m onlytranslated
        echo "Running Start"
        RAILS_ENV=production rake db:migrate
        RAILS_ENV=production bin/dev
        ;;
    test)
        echo "Running tests"
        RAILS_ENV=test rake db:migrate
        RAILS_ENV=test bundle exec rspec
        ;;
    *)
        exec "$@"
esac
