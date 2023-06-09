<div align="center">
    <h1 align="center">Omnidash</h1>
    <h5>Open Source Multi-client Ticket Dashboard</h5>
</div>

<div align="center">
  <a href="https://sonarcloud.io/api/project_badges/measure?project=bartvdbraak_omnidash&metric=alert_status"><img src="https://sonarcloud.io/api/project_badges/measure?project=bartvdbraak_omnidash&metric=alert_status" /></a>
  <a href="https://github.com/bartvdbraak/omnidash/deployments/activity_log?environment=Production"><img src="https://img.shields.io/github/deployments/bartvdbraak/omnidash/production?label=vercel&logo=vercel" /></a>
</div>

<div align="center">
  <a href="https://omnidash.io?ref=github">omnidash.io</a>
</div>
<br/>


## Installation

To install the project and its dependencies, follow these steps:

1.  Ensure you have `yarn` installed on your system. If not, you can install it by running:

    ```sh-session
    npm install -g yarn
    ```

2.  Run the following command to install the project dependencies:
    ```sh-session
    yarn install
    ```

### Environment Variables

After setting up the required services, you need to set the corresponding environment variables in the `/.env` file. To do this, follow these steps:

1.  Make a copy of the `.env.example` file:
    ```sh-session
    cp .env.example .env
    ```
2.  Open the `.env` file in a text editor and populate the values for the services mentioned above.

## Build

To build the project, execute the following command:

```sh-session
yarn build
```

## Run

To run the project locally, use the following command:

```sh-session
yarn dev
```
