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

These are the GCP APIs that have to be enabled for this project to successfully deploy:
- GCR
- Cloud Build
- Secret Manager
- Cloud Run

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
- <TBD>


