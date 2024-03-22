# Infrastructure

While the application can be deployed in any server configuration that supports the application's
dependencies, this project includes a [Terraform](https://www.terraform.io/) project
that you can use to easily and quickly deploy it using
[Google Cloud Platform](https://cloud.google.com/).

## Dependencies

Here is the list of technical dependencies for deploying the HeCo app using these infrastructure
resources. Note that these requirements are for this particular deployment strategy, and not dependencies
of the HeCo application itself - which can be deployed to other infrastructures.

Before proceeding, be sure you are familiar with all of these tools, as these instructions
will skip over the basics, and assume you are conformable using all of them.

- [Google Cloud Platform](https://cloud.google.com)
- [Terraform](https://www.terraform.io/)
- [Docker](https://www.docker.com/)
- [Github](https://github.com) account and permissions to integrate
  with [GCP Cloud Build](https://cloud.google.com/build/docs/automating-builds/build-repos-from-github)
- DNS management
- A purchased domain

## Structure

This project has 2 main sections, each of which with a folder named after it. Each of these sections has a
Terraform project, that logically depends on their predecessors. There is a 3rd component to this architecture,
which is handled by Github Actions

#### Remote state

Creates a [GCP Storage Bucket](https://cloud.google.com/storage/docs/json_api/v1/buckets)
that will store the Terraform remote state.

#### Base

Contains multiple GCP resources needed for running HeCo on GCP.

These resources include, but are not limited to:

- The bastion host to access the GCP infrastructure
- Cloud Registry, for docker image storage
- Cloud Build config, to run CI and deploy the applications
- Cloud Run, to host the live applications
- Cloud SQL, for relational data storage
- Networking and load balancing resources
- Uptime monitoring
- DNS config
- Storage bucket for object storage by the app
- Several other minor resources

To apply this project, you will need the following GCP permissions. These could probably be further fleshed out to a
more restrictive set of permissions/roles, but this combination is know to work:

- "Editor" role
- "Secret Manager Admin" role
- "Cloud Run Admin" role
- "Compute Network Admin" role
- "Security Admin" role

The output values include access data for some of the resources above.

#### Github Actions

As part of this infrastructure, Github Actions are used to automatically build and push Docker images to [GCP Container
Registry](https://cloud.google.com/container-registry), and to redeploy those images once they are pushed. Access by
Github to GCP
is configured through special authorization rules, automatically set up by the Terraform `base` project above.

## How to deploy

Deploying the included Terraform project is done in steps:

- Terraform `apply` the `Remote State` project.
- Terraform `apply` the `Base` project.

## Maintenance

### Connecting to the Cloud SQL databases

In case you need to access the Postgres database for the app, running in Cloud SQL, you can follow these steps.
This is a slimmed down version
of [this guide](https://medium.com/google-cloud/cloud-sql-with-private-ip-only-the-good-the-bad-and-the-ugly-de4ac23ce98a)

- (one time per user) Run `gcloud compute ssh staging-heco-bastion` to SSH into the bastion host
- (one time per bastion host) Inside the bastion host, download
  the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy),
  apply `chmod a+x` and make sure it's in an executable path.
- (when connecting) Run `gcloud compute start-iap-tunnel <bastion instance name> 22 --local-host-port=localhost:4226`
  locally. This will start a tunnel, which you must keep open for the duration of your access to the SQL database
- (when connecting)
  Run `ssh -L 3306:localhost:3306 -i ~/.ssh/google_compute_engine -p 4226 localhost -- cloud_sql_proxy -instances=<sql instance connection name>=tcp:3306`
  locally. This will start a 2nd tunnel, which you must also keep open for the duration of your access to the SQL
  database
- The remote Postgres database is now reachable on `localhost:3306`

### Changing values of environment variables or secrets

Environment variables and secrets are set via the terraform scripts. Many of them are populated automatically from values derived from the infrastructure resources (e.g. database connection details). Some of them need to be set to known values (e.g. third party API keys). The list of these known values is kept in LastPass. When running `terraform apply`, it is best to have them saved in a local file outside of version control:

1. Create a file in `infrastructure/base/vars/terraform-local.tfvars` with contents from LastPass
2. In `infrastructure/base`, run `terraform apply -var-file=vars/terraform-local.tfvars`

A special consideration for the environment variables with http authentication credentials. These are used by both the back-end and front-end applications to control whether or not to enforce http authentication based on their presence. When the credentials exist in the environment of the application, http authentication will be required. The credentials are passed from the `vars/terraform-local.tfvars` to the provisioned environments through the terraform input variables of the `env` module, called `http_auth_username` and `http_auth_username` (see `infrastructure/base/main.tf` for how these are passed into `production` / `staging` modules). It is therefore easy to disable http authentication per environment by setting these variables to empty strings.

## Backups

There are two main permanent data storage mechanisms in the HeCo application that need backup.

### SQL

The project's backend application relies on a PostgreSQL database, that is implemented in the infrastructure using
GCP's Cloud SQL. Cloud SQL has a built-in backup functionality, which is currently configured to create a backup daily,
and keep it for 30 days. Backup restoration can be done manually. Refer to the official GCP documentation on this
feature for instructions and more details.

### Object Storage

The application stores certain files in object storage, which is implemented in the infrastructure using GCP's Cloud
Storage. Cloud Storage has built-in versioning functionality, which allows accessing old versions of a file, should it
be modified, as well as accessing deleted files. Refer to the official GCP documentation on this feature for more
details, and instructions on how to use it to recover lost data.
