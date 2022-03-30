#!/bin/sh
set -e

case "$1" in
    test)
        echo "Running test"
        exec yarn test
        ;;
    develop)
        echo "Running web application in development mode"
        exec yarn dev
        ;;
    build)
        echo "Build web application"
        exec yarn build
        ;;
    start:prod)
        echo "Run previously built application"
        exec yarn start
        ;;
    *)
        echo "Usage: entrypoint.sh {test|develop|build|start:prod}" >&2
        exit 1
        ;;
esac
