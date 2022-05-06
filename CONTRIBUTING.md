# Contributing Guidelines

## How to Contribute

1. Fork this repository
2. Create a new branch
3. Submit a pull request

NOTE: To make the Pull Requests' (PRs) testing and merging process easier, please submit changes to multiple charts in separate PRs unless the changes are related.

### Technical Requirements

When submitting a PR make sure that it:

1. Must pass CI jobs for linting and test the changes on top of different k8s platforms.
2. Must follow best practices and coding standards.
3. Do NOT bump the version as versioning will be handled by our CI/CD release process using semver principles driving by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). CI/CD will then automatically create Tagged/Github releases with an updated [CHANGELOG](./CHANGELOG.md), and then publish (including your changes) to our artefact (i.e. Docker, NPM, etc) repository.

### Documentation Requirements

1. [README.md](./README.md) must include:
   1. configuration options; and
   2. instructions on how to run and test this component
