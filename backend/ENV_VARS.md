For starters, we’ll need these:
RAILS_ENV (I prefer to separate staging / production, but maybe that’s just an old habit no longer needed)
RACK_ENV
RAILS_MAX_THREADS (say 10)
SECRET_KEY_BASE (generated with rake secret)
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

This next bit I’m not entirely sure about, has to do with accessing GCP services, in particular the background jobs. I’m following here the config for the cloudtasker gem:
GCP_LOCATION_ID
GCP_PROJECT_ID
GCP_QUEUE_PREFIX
PROCESSOR_HOST (I’m not sure about this, possibly url of the cloud run instance for tasks)
