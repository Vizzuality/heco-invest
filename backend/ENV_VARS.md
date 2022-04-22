For starters, we’ll need these:
RAILS_ENV (I prefer to separate staging / production, but maybe that’s just an old habit no longer needed)
RACK_ENV
RAILS_MAX_THREADS (say 10)
SECRET_KEY_BASE (generated with rake secret)

Control which routes are available for Rails instance
IS_API_INSTANCE
IS_JOBS_INSTANCE

BACKEND_URL (without protocol)
RAILS_RELATIVE_URL_ROOT (if running backend application in sub url, like /backend)

DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD
DATABASE_HOST

Next, the email settings, for which we’ll use sendgrid and I guess we’ll need the smtp connection settings:
SMTP_USERNAME
SMTP_PASSWORD
SMTP_HOST
SMTP_PORT

And some more mailer settings:
MAILER_DEFAULT_HOST (for links in emails)
MAILER_DEFAULT_FROM (sender email address)

Transifex:
TX_TOKEN

if we want http auth:
HTTP_AUTH_USERNAME
HTTP_AUTH_PASSWORD

# Pub/Sub vars for https://github.com/googleapis/google-cloud-ruby/tree/main/google-cloud-pubsub
# These are test values, we'll have different ones once we know actual topics/subscribers
TEST_PUBSUB_TOPIC
TEST_PUBSUB_SUBSCRIPTION
