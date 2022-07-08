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
- [Github](https://github.com) account and permissions to integrate with [GCP Cloud Build](https://cloud.google.com/build/docs/automating-builds/build-repos-from-github)
- DNS management
- A purchased domain

## Structure

This project has 2 main sections, each of which with a folder named after it. Each of these sections has a
Terraform project, that logically depends on their predecessors. There is a 4th component to this architecture,
which is handled by Github Actions

#### Remote state

Creates a [GCP Storage Bucket](https://cloud.google.com/storage/docs/json_api/v1/buckets)
that will store the Terraform remote state.

#### Base

Contains multiple GCP resources needed for running HeCo on GCP.

These resources include, but are not limited to:
- <TBD>

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
Registry](https://cloud.google.com/container-registry), and
to redeploy those images once they are pushed. To be able to do so, you need to specify the following Github Actions
Secrets with the corresponding values:

- <TBD>

## How to deploy

Deploying the included Terraform project is done in steps:
- Terraform `apply` the `Remote State` project.
- Terraform `apply` the `Base` project.


## Maintenance

### Connecting to the Cloud SQL databases

In case you need to access the Postgres database for the app, running in Cloud SQL, you can follow these steps.
This is a slimmed down version of [this guide](https://medium.com/google-cloud/cloud-sql-with-private-ip-only-the-good-the-bad-and-the-ugly-de4ac23ce98a)

- (one time per user) Run `gcloud compute ssh staging-heco-bastion` to SSH into the bastion host
- (one time per bastion host) Inside the bastion host, download the [Cloud SQL Auth proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy),
apply `chmod a+x` and make sure it's in an executable path.
- (when connecting) Run `gcloud compute start-iap-tunnel <bastion instance name> 22   --local-host-port=localhost:4226`
locally. This will start a tunnel, which you must keep open for the duration of your access to the SQL database
- (when connecting) Run `ssh -L 3306:localhost:3306 -i ~/.ssh/google_compute_engine -p 4226 localhost -- cloud_sql_proxy -instances=<sql instance connection name>=tcp:3306`
  locally. This will start a 2nd tunnel, which you must also keep open for the duration of your access to the SQL database
- The remote Postgres database is now reachable on `localhost:3306`
