For starters, we’ll need these:
RAILS_ENV (I prefer to separate staging / production, but maybe that’s just an old habit no longer needed)
RACK_ENV
RAILS_MAX_THREADS (say 10)
SECRET_KEY_BASE (generated with rake secret)

Control if jobs routes are available (default false)
IS_JOBS_INSTANCE

BACKEND_URL (without protocol)
RAILS_RELATIVE_URL_ROOT (if running backend application in sub url, like /backend)

GCP services config
GCP_PROJECT_ID - Id of the GCP project
GCP_REGION - GCP region where the project's GCP resources are hosted

Cloud Tasks configuration
CLOUDTASKER_PROCESSOR_HOST - with protocol, as available from outside the platform, e.g. https://your-public-domain.com
CLOUDTASKER_PROCESSOR_PATH - path in the domain above where the task runner is available. Defaults to /cloudtasker/run
CLOUD_TASKS_QUEUE_PREFIX  - Queue name prefix
CLOUD_TASKS_TEST_QUEUE_NAME - Test queue name after prefix

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
