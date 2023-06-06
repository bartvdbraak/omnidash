<div align="center">
    <h1 align="center">Omnidash</h1>
    <h5>Open Source Multi-client Ticket Dashboard</h5>
</div>

<div align="center">
  <a href="https://omnidash.io?ref=github">omnidash.io</a>
</div>
<br/>

## Installation

To install the project and its dependencies, follow these steps:

1.  Ensure you have `pnpm` installed on your system. If not, you can install it by running:

    ```sh-session
    npm install -g pnpm
    ```

2.  Run the following command to install the project dependencies:
    ```sh-session
    pnpm install
    ```

### Environment Variables

After setting up the required services, you need to set the corresponding environment variables in the `/.env` file. To do this, follow these steps:

1.  Make a copy of the `.env.example` file:
    ```sh-session
    cp .env.example .env
    ```
2.  Open the `/apps/web/.env` file in a text editor and populate the values for the services mentioned above.

## Build

To build the project, execute the following command:

```sh-session
pnpm build
```

## Run

To run the project locally, use the following command:

```sh-session
pnpm run dev
```
