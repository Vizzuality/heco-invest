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
        # exclude system specs until we fix testing with chromium, or try to install chrome on alpine
        # We still have GH actions to run the whole suite
        RAILS_ENV=test bundle exec rspec --exclude-pattern "**/system/**/*_spec.rb"
        ;;
    *)
        exec "$@"
esac
