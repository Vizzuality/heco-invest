#!/bin/bash
set -e

case "$1" in
    start)
        echo "Running Start"
        RAILS_ENV=production rake db:migrate
        exec RAILS_ENV=production bin/dev
        ;;
    *)
        exec "$@"
esac
